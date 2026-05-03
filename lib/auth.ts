import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "@auth/core/adapters";
import { sql } from "@/lib/db";
import { randomUUID } from "crypto";

// Hand-rolled Postgres adapter for @neondatabase/serverless. Mirrors the
// schema in db/schema.sql (snake_case → camelCase mapping at the boundary).

function nz(v: unknown): string | null {
  return v == null ? null : String(v);
}

function toUser(row: Record<string, unknown>): AdapterUser {
  return {
    id: String(row.id),
    name: (row.name as string | null) ?? null,
    email: String(row.email),
    emailVerified: row.email_verified ? new Date(row.email_verified as string) : null,
    image: (row.image as string | null) ?? null,
  };
}

function neonAdapter(): Adapter {
  return {
    async createUser(user) {
      const id = randomUUID();
      const [row] = (await sql`
        INSERT INTO users (id, name, email, email_verified, image)
        VALUES (${id}, ${nz(user.name)}, ${user.email}, ${user.emailVerified ?? null}, ${nz(user.image)})
        RETURNING *
      `) as Record<string, unknown>[];
      return toUser(row);
    },
    async getUser(id) {
      const rows = (await sql`SELECT * FROM users WHERE id = ${id}`) as Record<string, unknown>[];
      return rows[0] ? toUser(rows[0]) : null;
    },
    async getUserByEmail(email) {
      const rows = (await sql`SELECT * FROM users WHERE email = ${email}`) as Record<string, unknown>[];
      return rows[0] ? toUser(rows[0]) : null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const rows = (await sql`
        SELECT u.* FROM users u
        JOIN accounts a ON a.user_id = u.id
        WHERE a.provider = ${provider} AND a.provider_account_id = ${providerAccountId}
      `) as Record<string, unknown>[];
      return rows[0] ? toUser(rows[0]) : null;
    },
    async updateUser(user) {
      const [row] = (await sql`
        UPDATE users SET
          name = COALESCE(${nz(user.name)}, name),
          email = COALESCE(${user.email ?? null}, email),
          email_verified = COALESCE(${user.emailVerified ?? null}, email_verified),
          image = COALESCE(${nz(user.image)}, image)
        WHERE id = ${user.id} RETURNING *
      `) as Record<string, unknown>[];
      return toUser(row);
    },
    async deleteUser(id) {
      await sql`DELETE FROM users WHERE id = ${id}`;
    },
    async linkAccount(account) {
      const id = randomUUID();
      await sql`
        INSERT INTO accounts (id, user_id, type, provider, provider_account_id,
          refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
        VALUES (${id}, ${account.userId}, ${account.type}, ${account.provider},
          ${account.providerAccountId}, ${nz(account.refresh_token)}, ${nz(account.access_token)},
          ${account.expires_at ?? null}, ${nz(account.token_type)}, ${nz(account.scope)},
          ${nz(account.id_token)}, ${nz(account.session_state)})
      `;
      return account as AdapterAccount;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await sql`DELETE FROM accounts WHERE provider = ${provider} AND provider_account_id = ${providerAccountId}`;
    },
    async createSession(session) {
      const id = randomUUID();
      await sql`
        INSERT INTO sessions (id, user_id, expires, session_token)
        VALUES (${id}, ${session.userId}, ${session.expires}, ${session.sessionToken})
      `;
      return session as AdapterSession;
    },
    async getSessionAndUser(sessionToken) {
      const rows = (await sql`
        SELECT s.id AS s_id, s.user_id, s.expires, s.session_token, u.*
        FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.session_token = ${sessionToken}
      `) as Record<string, unknown>[];
      const row = rows[0];
      if (!row) return null;
      return {
        session: {
          sessionToken: String(row.session_token),
          userId: String(row.user_id),
          expires: new Date(row.expires as string),
        },
        user: toUser(row),
      };
    },
    async updateSession({ sessionToken, expires, userId }) {
      const [row] = (await sql`
        UPDATE sessions SET
          expires = COALESCE(${expires ?? null}, expires),
          user_id = COALESCE(${userId ?? null}, user_id)
        WHERE session_token = ${sessionToken} RETURNING *
      `) as Record<string, unknown>[];
      if (!row) return null;
      return {
        sessionToken: String(row.session_token),
        userId: String(row.user_id),
        expires: new Date(row.expires as string),
      };
    },
    async deleteSession(sessionToken) {
      await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
    },
    async createVerificationToken(token) {
      await sql`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires})
      `;
      return token;
    },
    async useVerificationToken({ identifier, token }) {
      const rows = (await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier} AND token = ${token}
        RETURNING identifier, token, expires
      `) as Record<string, unknown>[];
      if (!rows[0]) return null;
      return {
        identifier: String(rows[0].identifier),
        token: String(rows[0].token),
        expires: new Date(rows[0].expires as string),
      } satisfies VerificationToken;
    },
  };
}

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails.includes(email.toLowerCase());
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: neonAdapter(),
  session: { strategy: "database" },
  providers: [
    Resend({
      from: process.env.RESEND_FROM_EMAIL,
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  pages: { signIn: "/auth/signin" },
});

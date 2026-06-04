export const TRADE_POLICY_WAIT =
  "Books cannot be dropped off, so you must wait while we review your stack due to limited storage capacity.";

export const TRADE_POLICY_NOV1 =
  "If you already have credit, we stop accepting books for trade on Nov 1 each year so we can catch up on inventory and give people time to use their credit.";

export const TRADE_POLICY_EXPIRY =
  "Credit expires every year on Dec 31, so make sure to use it.";

export const TRADE_POLICY_CAP =
  "Credit is capped at $200, and you must spend it down below $200 before accumulating more.";

export const TRADE_POLICY_WAIT_AND_EXPIRY = `${TRADE_POLICY_WAIT} ${TRADE_POLICY_EXPIRY}`;

export const TRADE_POLICY_EXPIRY_AND_CAP = `${TRADE_POLICY_EXPIRY} ${TRADE_POLICY_CAP}`;

export const TRADE_POLICY_CAP_AND_NOV1 = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1}`;

export const TRADE_POLICY_ALL_CREDIT_LIMITS = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1} ${TRADE_POLICY_EXPIRY}`;

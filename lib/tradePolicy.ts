// Book Exchange Policy effective July 1, 2026: swap fees are gone; store
// credit now covers half of the checkout total, the rest is cash or card.
export const TRADE_POLICY_EFFECTIVE_DATE = "July 1, 2026";

export const TRADE_POLICY_CREDIT_YIELD =
  "You receive 25% of the book's original list price in store credit on any book we're able to take.";

export const TRADE_POLICY_REDEMPTION =
  "Store credit covers half of your total purchase price — you pay the other half with cash or card.";

export const TRADE_POLICY_REDEMPTION_EXAMPLE =
  "For example, if your total is $15.00, you would pay $7.50 with store credit and $7.50 with cash or card.";

export const TRADE_POLICY_PRICING =
  "Without credit, books are priced at 50% of the list price unless otherwise marked with our store's sticker.";

export const TRADE_POLICY_WAIT =
  "Books cannot be dropped off, so you must wait while we review your stack due to limited storage capacity.";

export const TRADE_POLICY_NOV1 =
  "If you already have credit, we stop accepting books for trade on Nov 1 each year so we can catch up on inventory.";

export const TRADE_POLICY_ROLLOVER =
  "Credit never expires and rolls over year to year, so you can use it whenever you like.";

export const TRADE_POLICY_CAP =
  "Credit is capped at $200, and you must spend it down below $200 before accumulating more.";

export const TRADE_POLICY_REDEMPTION_FULL = `${TRADE_POLICY_REDEMPTION} ${TRADE_POLICY_REDEMPTION_EXAMPLE}`;

export const TRADE_POLICY_WAIT_AND_ROLLOVER = `${TRADE_POLICY_WAIT} ${TRADE_POLICY_ROLLOVER}`;

export const TRADE_POLICY_CAP_AND_ROLLOVER = `${TRADE_POLICY_CAP} ${TRADE_POLICY_ROLLOVER}`;

export const TRADE_POLICY_CAP_AND_NOV1 = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1}`;

export const TRADE_POLICY_ALL_CREDIT_LIMITS = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1} ${TRADE_POLICY_ROLLOVER}`;

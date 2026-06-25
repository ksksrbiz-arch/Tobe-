export const TRADE_POLICY_WAIT =
  "Books cannot be dropped off, so you must wait while we review your stack due to limited storage capacity.";

export const TRADE_POLICY_NOV1 =
  "If you already have credit, we stop accepting books for trade on Nov 1 each year so we can catch up on inventory.";

export const TRADE_POLICY_ROLLOVER =
  "Credit never expires and rolls over year to year, so you can use it whenever you like.";

export const TRADE_POLICY_CAP =
  "Credit is capped at $200, and you must spend it down below $200 before accumulating more.";

export const TRADE_POLICY_WAIT_AND_ROLLOVER = `${TRADE_POLICY_WAIT} ${TRADE_POLICY_ROLLOVER}`;

export const TRADE_POLICY_CAP_AND_ROLLOVER = `${TRADE_POLICY_CAP} ${TRADE_POLICY_ROLLOVER}`;

export const TRADE_POLICY_CAP_AND_NOV1 = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1}`;

export const TRADE_POLICY_ALL_CREDIT_LIMITS = `${TRADE_POLICY_CAP} ${TRADE_POLICY_NOV1} ${TRADE_POLICY_ROLLOVER}`;

/** Storage key used to persist the "funded banner dismissed" flag per-escrow. */
export function getEscrowFundedBannerStorageKey(escrowId: string): string {
  return `escrow-funded-banner-dismissed:${escrowId}`;
}

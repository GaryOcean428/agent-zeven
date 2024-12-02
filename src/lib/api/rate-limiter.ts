export class RateLimiter {
  private maxRequests: number;
  private interval: number;
  private tokens: number;
  private lastRefill: number;

  constructor({ maxRequests, interval }: { maxRequests: number; interval: number }) {
    this.maxRequests = maxRequests;
    this.interval = interval;
    this.tokens = maxRequests;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = Math.floor((timePassed * this.maxRequests) / this.interval);

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxRequests, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  async acquire(): Promise<void> {
    this.refill();

    if (this.tokens > 0) {
      this.tokens--;
      return Promise.resolve();
    }

    const waitTime = Math.ceil(
      ((this.interval / this.maxRequests) - (Date.now() - this.lastRefill))
    );

    return new Promise(resolve => {
      globalThis.setTimeout(() => {
        this.refill();
        this.tokens--;
        resolve();
      }, waitTime);
    });
  }
}

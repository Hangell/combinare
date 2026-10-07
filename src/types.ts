/** Eager calls default to 100,000 results to bound memory use. */
export interface GenerationOptions {
  maxResults?: number;
}
export type SortOrder = 'asc' | 'desc';
export type RandomSource = () => number;
export interface NumericOptions extends GenerationOptions {
  /** Must return a finite number in [0, 1). Not suitable for cryptography. */
  random?: RandomSource;
}

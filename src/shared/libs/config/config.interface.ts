export interface Config<U> {
  ge<T extends keyof U>(key: T): U[T];
}

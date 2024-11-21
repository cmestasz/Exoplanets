type AsyncLoad = {
  state: 'loading' | 'error';
};

type AsyncReceived<T> = {
  state: 'loaded';
  data: T
};

type AsyncData<T> = AsyncLoad | AsyncReceived<T>;

export type { AsyncData };

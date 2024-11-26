export type AsyncLoad = {
  state: 'loading' | 'error';
};

export type AsyncResponse<T> = {
  state: 'loaded';
  data: T
};

type AsyncData<T> = AsyncLoad | AsyncResponse<T>;

export type { AsyncData };

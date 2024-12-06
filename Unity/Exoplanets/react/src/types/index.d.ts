export type AsyncLoad<T> = {
  state: 'loading' | 'error';
  data?: T;
};

export type AsyncResponse<T> = {
  state: 'loaded';
  data: T;
};

type AsyncData<T> = AsyncLoad<T> | AsyncResponse<T>;

export type { AsyncData };

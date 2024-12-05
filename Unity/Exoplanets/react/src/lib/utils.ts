// Warning: No usar este iterador en ciclos

import { API_SOCKET } from 'src/config';

class ArrayInfIterator<T> {
  private arr: T[];

  private index: number;

  constructor(arr: T[], c?: T) {
    if (arr.length <= 0) throw Error('El arreglo debe contener al menos un elemento');
    this.arr = arr;
    this.index = c ? this.arr.indexOf(c) - 1 : -1;
  }

  public next(): T {
    this.index += 1;
    return this.arr[this.index % this.arr.length];
  }

  public before(): T {
    this.index -= 1;
    return this.arr[(this.index + this.arr.length) % this.arr.length];
  }

  public reset(): void {
    this.index = -1;
  }
}

const AuthSocket = () => {
  // @ts-ignore
  const socket = new WebSocket(`${API_SOCKET}/login_flow`);
  socket.addEventListener('open', () => {
    console.log('Se estableció la conexión');
    socket.send('Hello!!');
  });
  socket.addEventListener('error', (e) => {
    console.log('Y este error?: ', e);
  });
  socket.addEventListener('close', (e) => {
    console.log('Se ha cerrado la conexión: ', e.code, e.reason);
  });
  return socket;
};

const UserStates = {
  ANON: 'anon',
  LOGGED: 'logged',
  UPDATING: 'updating',
} as const;

export { ArrayInfIterator, UserStates, AuthSocket };

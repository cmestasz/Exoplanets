// Warning: No usar este iterador en ciclos

export class ArrayInfIterator<T> {
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

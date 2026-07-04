import { makeAutoObservable } from 'mobx';

class CounterStore {
    value = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get doubleValue() {
        return this.value * 2;
    }

    increment() {
        this.value += 1;
    }

    decrement() {
        this.value -= 1;
    }
}

export const counterStore = new CounterStore();

export class Queue<T> {
    private _queue: T[];
    private readonly maxSize: number;

    /**
     * @param maxSize Maxiumu queue size. Default 20
     */
    public constructor(maxSize?: number) {
        this.maxSize = maxSize > 0 ? maxSize : 20;
        this._queue = new Array<T>();
    }

    public get queue(): T[] {
        return this._queue;
    }

    public isEmpty(): boolean {
        return this._queue.length === 0;
    }

    public isFull(): boolean {
        return this._queue.length === this.maxSize;
    }

    public enqueue(newItem: T): void {
        if (this.isFull()) {
            this.dequeue();
            this._queue.push(newItem);
        } else {
            this._queue.push(newItem);
        }
    }

    public dequeue(): T {
        if (this.isEmpty()) {
            throw new Error('Queue underflow');
        }

        return this._queue.shift();
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this._queue[0];
    }

}

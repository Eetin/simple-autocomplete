export class CancellationToken {
    constructor() {
        this.isCancellationRequested = false

        // Actions to execute when cancelled
        this.onCancelled = [
            () => { this.isCancellationRequested = true },
        ];

        // Expose a promise to the outside
        this.promise = new Promise(resolve => this.onCancelled.push(resolve))
    }

    cancel() {
        this.onCancelled.forEach(x => x())
    }
}

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

export const delayed = async (callback, value, token) => {
    await sleep(Math.floor((Math.random() * 450) + 50))
    if (token.isCancellationRequested) {
        console.log(`Search for ${value} was cancelled`)
        return null
    }
    console.log()
    const result = callback(value)
    console.log(`Found suggestions for ${value} `)
    return result
}

export default {
    delayed,
    CancellationToken,
}

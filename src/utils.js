export const delayed = (value, callback) =>
    setTimeout(callback, Math.floor((Math.random() * 450) + 50), value)

export default {
    delayed,
}

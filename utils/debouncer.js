export const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => fn.apply(context, args), delay);
    };
}
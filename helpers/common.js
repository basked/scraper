// массив из номера страниц
export function arrayFromLength(number) {
    return Array.from(new Array(number).keys()).map(k => k + 1)
}

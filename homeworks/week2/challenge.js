//從 arr 中間砍半開始找
function search(arr, n) {
    let len = arr.length
    if (len % 2 !== 0) {
        if (n > len / 2) {
            for (let i = 0; i < Math.floor(len / 2); i++) {
                if (arr[Math.ceil(len / 2)] + i === n) {
                    return Math.ceil(len / 2) + i
                }
            }
        }
        else {
            for (let i = 0; i < Math.ceil(len / 2); i++) {
                if (arr[i] === n) {
                    return i
                }
            }
        }
    }
    else {
        if (n > len / 2) {
            for (let i = 0; i < len / 2; i++) {
                if (arr[len / 2] === n) {
                    return i
                }
            }
        }
        else {
            for (let i = 0; i < len / 2; i++) {
                if (arr[i] === n) {
                    return i
                }
            }
        }
    }
    return -1
}
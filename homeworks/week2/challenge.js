//直接做搜尋
function search (arr, n) {
    binarySearch (arr, n)
}

function binarySearch (arr, n) { 
    let start = 0
    let end = arr.length - 1
    let mid = (end - start) / 2
    let midRight = Math.ceil(mid)
    let midLeft = Math.floor(mid)

    if (n >= arr[midRight]) {
        for (let i = midRight; i < arr.length; i++) {
            if (arr[i] === n) {
                return i
            }
        }
        return -1
    }
    else {
        for (let i = 0; i <= midLeft; i++) {
            if (arr[i] === n) {
                return i
            }
        }
        return -1
    }
}

function search (arr, n) {
    if (arr.length % 2 === 0) {
        evenArr (arr, n)
    }
    else {
        oddArr (arr, n)
    }
}

function evenArr (arr, n) { //evenArr指的是 arr 有偶數個 element
    let start = 0
    let end = arr.length - 1
    let mid = (start + end) / 2
    let midRight = Math.ceil(mid)
    let midLeft = Math.floor(mid)
    if (n >= arr[midRight]) {
        for (let i = midRight; i < arr.length; i++) {
            if (arr[i] === n) {
                return i
            }
            return -1
        }
    }
    else {
        for (let i = 0; i <= midLeft; i++) {
            if (arr[i] === n) {
                return i
            }
            return -1
        }
    }
}

function oddArr (arr, n) { //evenArr指的是 arr 有奇數個 element
    let start = 0
    let end = arr.length - 1
    let mid = (start + end) / 2
    if (n >= arr[mid]) {
        for (let i = mid; i < arr.length; i++) {
            if (arr[i] === n) {
                return i
            }
            return -1
        }
    }
    else {
        for (let i = 0; i < mid; i++) {
            if (arr[i] === n) {
                return i
            }
            return -1
        }
    }
}


function search (arr, n) {
    return binarySearch (arr, n)
}

function binarySearch(arr, n) {
    let left = 0
    let right = arr.length - 1
    let mid = Math.floor((right + left) / 2)

    while (right - left > 1) {
        if (arr[mid] === n) return mid
        if (arr[mid] < n) {
            left = mid + 1
        }
        else {
            right = mid - 1
        }
        mid = Math.floor((right + left) / 2)
    }
    if (arr[right] === n) return right
    else if (arr[left] === n) return left
    else return -1

}

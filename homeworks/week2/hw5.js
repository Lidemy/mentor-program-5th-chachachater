function join(arr, concatStr) {
  let str = '';
  for(let i = 0; i < arr.length; i++){
    if( i === arr.length - 1){
      str = str + arr[i]
      return str;
    }
    str += arr[i] + concatStr
  }
}

function repeat(str, times) {
  let rep = '';
  for(let i = 0; i < times; i++){
    rep += str
  }
  return rep;
}

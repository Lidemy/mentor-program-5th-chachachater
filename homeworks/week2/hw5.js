function join(arr, concatStr) {
  let str = '';
  for(let i = 0; i < arr.length; i++){
    if( i === arr.length - 1){
      str = str + arr[i]
      break;
    }
    str += arr[i] + concatStr
  }
  return str;
}

function repeat(str, times) {
  let rep = '';
  for(let i = 0; i < times; i++){
    rep += str
  }
  return rep;
}

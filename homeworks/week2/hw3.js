function reverse (str) {
  let reverse = '';
  for(let i = 0; i < str.length; i++){
    reverse += str[str.length - 1 - i]
  }
  console.log(reverse);
}

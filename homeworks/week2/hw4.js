function printFactor (n) {
  for(let i = 0; i < n; i++){
    if( n % (i + 1) === 0 ){console.log(i + 1)}
  }
}
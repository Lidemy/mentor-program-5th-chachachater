## hw1：Event Loop

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
Browser 在執行程式碼的時候，會把程式碼按照順序丟進 Stack 裡面，當遇到非同步的程式碼的時候，不會執行它而是會把它丟到 Webapis 裡面再執行，等執行完之後再把它丟到 taskqueque 裡面。最後，等到 Stack 裡面的程式碼都跑完（清空），event loop 會把非同步程式碼的執行結果丟到 Stack 裡面去執行 callback。等到 Stack 裡面的程式碼跑完（清空），event loop 再把 taskqueque 裡面的下一個非同步程式碼丟到 Stack 裡面去執行 callback...以此類推。

所以上面程式碼的執行順序是這樣的↓，執行結果會是`13524`
``` js
console.log(1) // 直接執行
setTimeout(() => {
  console.log(2)
}, 0) // 從 Stack 裡面丟到 Webapis 裡面之後等待 0 秒，等待完之後丟到 taskqueque 裡面
console.log(3) // 直接執行
setTimeout(() => {
  console.log(4)
}, 0) // 從 Stack 裡面丟到 Webapis 裡面之後等待 0 秒，等待完之後丟到 taskqueque 裡面
console.log(5) // 直接執行

// 等 Stack 清空之後，event loop 把程式碼從 taskqueque 裡面丟到 Stack 裡面執行 callback (`console.log(2)`)

// 再等 Stack 清空之後，event loop 把程式碼從 taskqueque 裡面丟到 Stack 裡面執行 callback (`console.log(4)`)
```
* stack / webapis 可以併行運作，stack 繼續執行程式碼的同時，webapi 也可以執行非同步的程式碼
* webapis 執行的是"非同步"的程式碼
* taskqueque 把程式碼丟到 Stack 的方式是：Stack 清空 > 丟進一個 cb > Stack 清空 > 丟進一個 cb > ...
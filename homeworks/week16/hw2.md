# hw2：Event Loop + Scope

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
``` js
// i = 0
  console.log('i: ' + i) // 直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) // 從 Stack 裡面丟到 Webapis 裡面，0*1000 ms 過後，放到 tackqueque 裡面排隊
// i = 1
  console.log('i: ' + i) // 直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) // 從 Stack 裡面丟到 Webapis 裡面，1*1000 ms 過後，放到 tackqueque 裡面排隊
// i = 2
  console.log('i: ' + i) // 直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) // 從 Stack 裡面丟到 Webapis 裡面，2*1000 ms 過後，放到 tackqueque 裡面排隊
// i = 3
  console.log('i: ' + i) // 直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) // 從 Stack 裡面丟到 Webapis 裡面，3*1000 ms 過後，放到 tackqueque 裡面排隊
// i = 4
  console.log('i: ' + i) // 直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) // 從 Stack 裡面丟到 Webapis 裡面，4*1000 ms 過後，放到 tackqueque 裡面排隊

// 此時 i = 4，等到 Stack 清空之後，再一一把 tackqueque 裡面排隊的程式碼們丟到 Stack 裡面執行 callback 的 console.log(4)
setTimeout(() => {
  console.log(4)
}, i * 1000) // i * 1000 的等待時間已經在 Webapis 裡面執行完了

setTimeout(() => {
  console.log(4)
}, i * 1000)

setTimeout(() => {
  console.log(4)
}, i * 1000)

setTimeout(() => {
  console.log(4)
}, i * 1000)

setTimeout(() => {
  console.log(4)
}, i * 1000)
```

所以輸出結果會是：
```js
i: 0
i: 1
i: 2
i: 3
i: 4
4
4
4
4
4
```
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
  console.log('i: ' + i) // 放到 stack 裡面直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) //  執行 setTimeout 這個 Webapis 等 0*1000 ms 過後，把 () = { console.log(i) } 放到 queque 裡面排隊

// i = 1
  console.log('i: ' + i) // 放到 stack 裡面直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) //  執行 setTimeout 這個 Webapis 等 1*1000 ms 過後，把 () = { console.log(i) } 放到 queque 裡面排隊

// i = 2
  console.log('i: ' + i) // 放到 stack 裡面直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) //  執行 setTimeout 這個 Webapis 等 2*1000 ms 過後，把 () = { console.log(i) } 放到 queque 裡面排隊

// i = 3
  console.log('i: ' + i) // 放到 stack 裡面直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) //  執行 setTimeout 這個 Webapis 等 3*1000 ms 過後，把 () = { console.log(i) } 放到 queque 裡面排隊
  
// i = 4
  console.log('i: ' + i) // 放到 stack 裡面直接執行
  setTimeout(() => {
    console.log(i)
  }, i * 1000) //  執行 setTimeout 這個 Webapis 等 4*1000 ms 過後，把 () = { console.log(i) } 放到 queque 裡面排隊

// 此時 i = 4，i * 1000 的等待時間已經執行完了，等到 Stack 清空之後，再一一把 queque 裡面排隊的程式碼們丟到 Stack 裡面執行 callback 的 console.log(4)
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
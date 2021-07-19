# hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // this 就是 hello, 但是它沒有 value 這個屬性。所以會發生 hoisting, hositsting 到 global.value (或是 Window.value), 因此最後結果是 undefined
```

this 跟函式怎麼被呼叫有關(arrow function 是例外)：

* 非 OOP 呼叫函式，this 就是 global
* OOP 的方式呼叫函式，this 就是 instance或 object或 object 本身，`obj2.hello()`，`hello()`
* 用變數來呼叫函式，this 就是 變數 本身，`hello()`
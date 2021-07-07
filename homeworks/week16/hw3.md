# hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

程式碼的 Execution context 執行結果如下，其中 fn2 裡面的 a, b 都沒有做變數的宣告，所以都有發生 hoisting，結果就是 `global EC.VO.b = 100`、`fn EC.AO.a = 20`

``` js
global EC
VO
a: undefined
fn: fc

// 執行 fn()，圖一


global EC
VO
a: 1
fn: fc

fn EC
AO
a: undefined
fn2: fc

// 圖二
// 執行 console.log(a) undefined
// 執行 a = 5
// 執行 console.log(a) 5
// 執行 a++
// 執行fn2()

global EC
VO
a: 1
fn: fc
b: undefined

fn EC
AO
a: 6
fn2: fc

fn2 EC
AO

// 圖三
// 執行 console.log(a) 6
// 執行 a = 20
// 執行 b = 100

global EC
VO
a: 1
fn: fc
b: 100

fn EC
AO
a: 20
fn2: fc

fn2 EC
AO

// 圖四
// 執行 console.log(a) 20
// 執行 console.log(a) 1
// 執行 a = 10
// 執行 console.log(a) 10
// 執行 console.log(b) 100
```

![圖一](https://i.imgur.com/sJElquL.png)

![圖二](https://i.imgur.com/zsJof9g.png)

![圖三](https://i.imgur.com/YSzt8Zk.png)

![圖四](https://i.imgur.com/V2WWLUi.png)
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

程式碼的 Execution context 執行詳細結果如下，其中 fn2 裡面的 a, b 都沒有做變數的宣告，所以都有發生 hoisting，hoisting 結果就是 `global EC.VO.b = 100`、`fn EC.AO.a = 20`。

``` js
global EC
VO
a: undefined
fn: fc

// 執行 fn()，也就是圖 1 的箭頭處
// 先產生 fn 的 EC
// 以上結果如下：

global EC
VO
a: 1
fn: fc

fn EC
AO
a: undefined
fn2: fc

// 然後再執行 fn()，也就是圖 2 的 5 個箭頭處
// 執行 console.log(a) undefined
// 執行 a = 5
// 執行 console.log(a) 5
// 執行 a++
// 執行fn2(), 先產生 fn2 的 EC
// 以上結果如下：

global EC
VO
a: 1
fn: fc
b: undefined // 因為 fn2 裡面的變數 b 沒有做宣告（圖3 藍色箭頭），fn 裡面也沒有變數 b，所以發生 hoisting 到 global 這邊

fn EC
AO
a: 6 // 因為 fn2 裡面的變數 a 沒有做宣告（圖3 藍色箭頭），但 fn 裡面有變數 a，所以發生 hoisting 到這邊
fn2: fc

fn2 EC // fn2 裡面沒有宣告任何變數或函式
AO

// 執行 console.log(a) 6
// 執行 a = 20
// 執行 b = 100
// 以上結果如下：

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

// 執行圖 4 的箭頭處
// 執行 console.log(a) 20
// 執行 console.log(a) 1
// 執行 a = 10
// 執行 console.log(a) 10
// 執行 console.log(b) 100
```
圖1:

![圖一](https://i.imgur.com/sJElquL.png)

圖2:

![圖二](https://i.imgur.com/zsJof9g.png)

圖3:

![圖三](https://i.imgur.com/YSzt8Zk.png)

圖4:

![圖四](https://i.imgur.com/V2WWLUi.png)


執行結果會是
```
undefined
5
6
20
1
10
100
```
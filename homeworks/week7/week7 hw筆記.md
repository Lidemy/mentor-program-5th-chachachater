# week7 hw筆記
> 一些可以再改善的地方，enter 後跳入下個欄位(google表單)，alert 顯示內容作排版(google 表單)

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/H1vLu9IKO)

## hw1

對於要做檢查的 input，可以先用固定格式的 HTML 來做新增然後再對其做檢查，例如↓，只要加上"required"，就代表它是要被檢查的區塊，之後可以用 JS 對 required 做檢查，如果要新增表單內容，用相同格式就可以直接新增並且可以被檢查到，而不用額外修改 JS
```htmlembedded=
<section class="basic-information required">
  <label for="nickname">暱稱<sup>*</sup></label>
  <input type="text" name="nickname" id="nickname" placeholder="您的回答" />
  <div class="notice hide">請輸入暱稱</div>
</section>
```

JS 的部分：
* `document.querySelector()` 的 "document" 是指整個 DOM 的 document，它可以換成其他範圍(常常忘記這點XD)
* `document.querySelectorAll()` 選擇到的是 Nodelist，可以用`[...Nodelist]` 把它變成真正的 array 來操作
```javascript=
let required = document.querySelectorAll('.required')
// 把 Nodelist 變成真正的 array↓
let requiredArr = [...required]

for (each of requiredArr) {
  // 再做一次 querySelector()
  let text = each.querySelector('input[type="text"]')
  let radios = each.querySelectorAll('input[type="radio"]')
//   以下略
}
```

### 其他

* email, phone-number 可以用 `type="email/number"` 來做檢查
* JS 程式碼的 `const number = each.querySelector('input[type="number"]')`，如果改成`const number = each.querySelectorAll('input[type="number"]')`的話，會抓到兩個NodeLIST，這個原因還不清楚是為什麼

### 幾種不顯示 HTML 標籤的方法

```css=
visibility: hidden;
opacity: 0;
display: none;
overflow: hidden
```

## hw2

### 尋找觸發 EventListener 的最近的元素

```javascript=
const element = event.target.closest('.title')
if (element) {
// do something
}
```

## hw3

### 小心網頁安全
> 例如使用者在 inputbox 輸入`<h1>123</h1>`，有可能被錯誤讀取成 node

[escape html](https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript)

### `.appendChild()` 可能是複製、可能是搬移

如果 appendChild 使用時，append 上去的是一個已存在的 node 時，它會做的是**搬移**，而非複製。

可以用`.cloneNode()`來解決這個問題

[說明](https://pjchender.blogspot.com/2017/06/js-node-element-appenchild-disappear.html)

### 加上 local storage 功能

local storage 存放的都是字串 string，所以在這邊使用 JSON 格式來存放 list 內容，存放的格式是這樣：
```json=
[
  {
    "id":0,
    "todo": "寫作業",
    "isFinished": false
  },
  {
  "id":1,
  "todo": "看影片",
  "isFinished": false
}
...
]
```
* id 一定是遞增的、唯一的(額外用變數 "count, lastList" 來記錄累計新增了幾筆資料)，例如：累計新增了 5 筆資料，
![](https://i.imgur.com/Pjbz7l0.png)
把第 `id=4`刪掉再新增一筆`todo=喝水`資料之後，id 會從5開始記錄
![](https://i.imgur.com/sBK9CW0.png)

* isFinished 表示有沒有加上刪除線和打勾
* 每次 list 內容有變動(加上刪除線、刪除)，都重新讀取 local storage，對 local storage 做完變動之後再存放回去

用 JSON 做處裡真的滿方便的，像是 todoList 重新整理之後，它會依照新增會刪除的順序自動排列，排序方式例如圖片表示（新增順序是 0,1,2,3,4,5,6），但缺點就是不會按照使用者刪除的先後順序來做排列Q_Q
![](https://i.imgur.com/eJpvjSP.png)

## 其他
```javascript=
// 取出 tagName
e.target.tagName
```

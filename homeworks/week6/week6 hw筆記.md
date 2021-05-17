# week6 hw筆記
[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/HJDQGjA_d)

* 這次作業給的圖片素材都很大，所以排版起來比較不會有奇怪的結果，使用的素材圖片大小越大越好(X

* 決定了之後預設的手機/平板/桌機大小是 268/768/1200 px

## 漢堡選單系列

* 實作了漢堡選單，實作的檔案在這周的資料夾裡面，[實作參考來源](https://codepen.io/erikterwan/pen/EVzeRP?editors=1100)，基本原理在紙本筆記上面。

* 讓漢堡選單有動畫效果，[參考教學](https://www.w3schools.com/howto/howto_css_menu_icon.asp)，需要配合 JS event listener 來監聽選單有沒有被點擊，需要注意的是我的漢堡選單有設定兩層重疊的 html tag 的 z-index，所以監聽對象要記得設定在上層的 HTML 標籤上

```css=
.change :nth-child(1) {
  transform: rotate(45deg);
  position: relative;
  top: 11px;
}

.change :nth-child(2) {
  display: none;
}

.change :nth-child(3) {
  transform: rotate(-45deg);
  position: relative;
  top: -1px;
}
```

```htmlembedded=
<script>
  function burgerChange (x) {
    x.classList.toggle('change')
    console.log('click')
  }
  const burgerBox = document.querySelector('input[type="checkbox"]')
  const burger = document.querySelector('.burger')
  burgerBox.addEventListener('click', function (e) {
    burgerChange(burger)
  })
</script>
```
## nav 黏在頂端

`position: sticky` 會比 `position: fixed` 好用，後者會讓排版流亂掉，需要重新再排

## "咬一口廚房" 的 banner 系列效果

* 給 "咬一口廚房" 的 banner 加上陰影效果，使用 ::after

```htmlembedded=
.banner {
  position: relative;
  height: 292px;
  background: url(bg.jpg) center/cover no-repeat;
}

.banner::after {
  content: ""; /*偽元素需要有它才會顯示*/
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top:0;
  left:0;
  right:0;
  bottom:0;
}
```

* 給 "咬一口廚房" 的 banner 加上 paradox scrolling 效果，[參考教學](https://www.w3schools.com/howto/howto_css_parallax.asp)

```htmlembedded=
.banner {
  background-image: url("bg.jpg");
  height: 400px;
  background-attachment: fixed;
  background-position: 32%,0%;
  background-repeat: no-repeat;
  background-size: cover;
}
```

## 食物圖片的系列效果

* 食物圖片 hover 時放大，並且不要 overflow
```css=
.section-images div {
  width: 25%;
  overflow: hidden;
}

.section-images img:hover {
  transform: scale(1.2, 1.2);
  transition: 0.5s;
}
```

### 食物圖片 hover 之後變暗+顯示餐點名稱的效果

* 這邊在還沒有給 CSS 設定的時候會遇到[這個問題](https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image)會有奇妙的空白在這邊，但不是因為 HTML 的空行造成，要先解決鰾不然陰影的大小沒辦法和食物圖片對上
![](https://i.imgur.com/nVhcWTK.png)


* **注意** 因為 img 標籤不能直接加上 `background: rgba(0, 0, 0, 0.5);` 之類的效果(無效)，所以要在標籤外面再用一個 div 標籤包住，然後在這個 div 標籤上做 `::after` 等陰影效果。
```htmlembedded=
<!-- HTML -->
<div><img src="f-001.png" alt="food-picture" /></div>
<div><img src="f-002.png" alt="food-picture" /></div>
<div><img src="f-003.png" alt="food-picture" /></div>
<div><img src="f-004.png" alt="food-picture" /></div>
```
```css=
/* CSS */
.section-images div:nth-child(odd):hover::after {
/* 調整"沙拉"的字體位置和大小 */
  padding-top: 45%;
  font-size: 50px;
  color: white;
  content: "沙拉";
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
/*  這個不知道是甚麼意思，但我找不到其它讓陰影大小跟圖片大小一樣的方法了...  */
  width: -webkit-fill-available;
  z-index: 55;
  height: -webkit-fill-available;
}
```

## hw2
* inputbox 的 border-tottom 動畫

```css=
/* 點選輸入欄位之後改變框線的動畫 */
input[type="text"]:focus {
  /* 讓 inputbox 預設的黃色框框消失 */
  outline: none;
  /*  加入設計好的 border  */
  border-bottom: solid 2px #fad312;
  transition: 0.7s;
}
```

* 讓表單以 form 格式送出 request，需要再 input tag 裡面的 attribute 做 key/value 的內容設定
![](https://i.imgur.com/fEMX3dP.png)


## 第一次切的時後的心得記錄

## hw1

### 在切頭像的時候發現到 :
(原始code還在hw1 CSS裡面)

使用 position:absolute 的元素，需要再設定 top, right, bottom, left 那些屬性，如果沒設定的話，預設就會是它原本在 absolute 之後的位子，也就是不會基於上層第一個不是 static 的元素位置來做基準點。
> 後來發現 position: fixed 也是同理，看來這兩個會跳脫排版流的屬性都是相同的原理

### 用 display: flex 處理文字爆框問題很方便

## hw2

### label / input 的方法

因為我自己的思路是使用 label 把 input 包起來(點label的文字就會自動選取到輸入框) ↓
```htmlembedded=
<label for="phone-number">手機號碼</label>
<input type="text" id="phone-number" placeholder="您的手機號碼"/>
```
---

後來看影片發現其實這樣更簡單 ↓
```htmlembedded=
<label>手機號碼
  <input type="text" name="basic-information__phone-number" placeholder="您的手機號碼" required />
</label>
```
結果 ↓
![](https://i.imgur.com/K8v5pdv.png)


### 處理星星符號*的方法

比較難處裡的點是那個星星 * 符號，然後我又不是很想到處用 div 包住，所以就分別處理了，這邊記錄一下影片中的另一種處理星星 * 符號(16:10)的方法。
> 反過來想，如果網頁的 HTML 都由 div 組成的話，好像就可以很方便地到處複製一些已經切過的版面？這樣想想也是不錯的方法

```htmlembedded=
<section class="section__basic-information">
  <div class="add-star">
  <label for="phone-number">手機號碼</label>
  </div>
  <input type="text" name="basic-information__phone-number" id="phone-number" placeholder="您的手機號碼" required />
</section>
```
```css=
.add-star:after {
  content:"*";
  color:#e74149;
}
```
#### 結果

![](https://i.imgur.com/eDBn1OZ.png)

這樣就能同時兼容我想要的「點label的文字就會自動選取到輸入框」效果。

### input radio 本身不能修改樣式，需要額外自己設計
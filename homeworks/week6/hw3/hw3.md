# week6 hw3

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/Hy-CfRg_O)

## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

### `<form>`，表單

製作網頁中的表單部分，可以設置 request method, request direction，搭配`<input>`, `<label>`使用可以客製化 form data，以這次作業為例 ↓，表單使用 POST method 將資料送往 `#`。
```htmlembedded=
<form method="POST" action="#">

<input type="radio" name="type-of-application" value="A" id="type1" />
<label for="type1">躺在床上用想像力實作</label>

<input type="radio" name="type-of-application" value="B" id="type2" required />
<label for="type2">趴在地上滑手機找現成的</label>

<input class="button" type="submit" value="提交" />
</form>
```

---
* 送出的表單格式會長下圖這樣(使用 chrome) ↓↓
![表單格式](https://i.imgur.com/14uAVtI.png)

* 成果長這樣 ↓
![成果](https://i.imgur.com/XrhirrF.png)


### `<select>`，下拉式表單

用來產生下拉式表單，表單內的選項用`<option>` tag來產生，裡面再搭配 `<optgroup>` 可以做細項的分類，例如 ↓
```htmlembedded=
  <label for="pokemon__select">Choose your first pokemon</label>
  <select id="pokemon__select">
    <option value="">---selection---</option>
    <optgroup label="Grass">
      <option value="Bulbasaur">Bulbasaur</option>
      <option value="Treecko">Treecko</option>
      <option value="Chikorita">Chikorita</option>
    </optgroup>
    <optgroup label="Fire">
      <option value="Charmander">Charmander</option>
      <option value="Vulpix">Vulpix</option>
      <option value="Growlithe">Growlithe</option>
    </optgroup>
    <optgroup label="Water">
      <option value="Squirtle">Squirtle</option>
      <option value="Psyduck">Psyduck</option>
      <option value="Slowpoke">Slowpoke</option>
    </optgroup>
    <optgroup label="Electric">
      <option value="Pikachu">Pikachu</option>
      <option value="Jolteon">Jolteon</option>
      <option value="Mareep">Mareep</option>
    </optgroup>
  </select>
```
---

成果(可以從自料夾的檔案開啟實際網頁) ↓
![](https://i.imgur.com/jk6HZ5Z.png)

### `<button>`，就是一個按鈕

做作業的時候，滿好奇下面三者的差別，因為在畫面的呈現上其實滿像的。
```htmlembedded=
<input type="button" />
<input type="submit" />
<button>
```

* `<input type="button" />`click之後，預設狀態下不會做甚麼事，也不會把表單資料送出。
* `<input type="button" />`click之後，預設狀態下會把表單資料送出(+刷新頁面)，它屬於表單資料的一部分，所以 value 會一起送出。
* `<button>` 就只是一個按鈕，click 之後會發生什麼事情需要再做設定。如果放在`<form>`裡面則會把表單送出，但它不屬於表單資料的一部分，所以 value 不會一起送出。

### `<details>`，做出摺疊/展開的效果

用`<details></details>`可以做出摺疊展開的效果，像這樣↓
<details>
123
</details>

## 請問什麼是盒模型（box model）

Brower engine 從 HTML、CSS 到 display 的流程：
![display provess](https://i.imgur.com/WQeQrYS.png)

Brower engine 在圖片中的 rendering 階段會把每一個 HTML tag 視為一個 box，再根據 CSS 來決定每一個 box 的大小（和其他設定），box 的基本設定長這樣↓
![](https://i.imgur.com/HaQOTNe.png)


* content: 顯示實質的 element 內容
* padding: 把 content 向內擠
* margin: 把整個 box 向外推
> 一個簡單的 margin/padding 分辨方法:
padding 相當於一個國家把國界線往外推(國土 = content 變大了)，margin 則相當於一個國家把國界線之外的人趕走。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* block
  * 例如：div, h1, p
  * 佔據一整行(佔地為王)，什麼都可以調
* inline
  * 例如：span, a
  * 可以並排，但調寬高、上下邊距(padding)沒有用，上下邊距(padding)沒有用是指**對 content 沒有用**，實際上的 padding 還是可以被改變，只是元素之間的 padding 可能會重疊，像這樣：
  ![](https://miro.medium.com/max/500/1*U7JLhI6IHWQk6twON8AXHg.png)
* block-inline
  * 例如：button, input, select
  * 對外像 inline，對內像 block，也就是它是可以被並排的 block，並且可以調整寬高、padding。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* `position: static`根據元素**預設**的樣式(inline/block)來決定位置
* `position: relative`相對於本身預設位置來做移動，移動之後不會影響其他元素的位置
* `position: absolute`往上層找出第一個不是static的元素，作為基準點來做移動，移動之後會影響其他元素的位置。 通常會搭配`position: relative`來做定位，或是搭配` transform:translate(x, y)`來做位移，具體做法如下面段落。
* `position: fixed`相對於 viewport 來做定位(類似於瀏覽器的視窗)，真的就像是一張黏在螢幕上的便利貼，不管視窗怎麼滾動，element 都會在固定位置

### `position: absolute`來做置中的方法
```css=
.wrapper2 {
  background-color: aquamarine;
  width: 300px;
  height: 300px;
  color: #6d4242;
  border: solid black 1px;
/*---下面是重點---*/
  position: absolute;
  left: 50%;
  top: 50%;
} 
```
實際位移會是這樣(原本在左上角貼合)↓
![](https://i.imgur.com/cF7lZKb.png)

搭配使用 transform 做位移(基於元素本身寬高來位移)
```css=
  position: absolute;
  left: 50%;
  top: 50%;
  /*---把上面改成下面---*/
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
```
最後變成藍色框框這樣 ↓
![](https://i.imgur.com/xQQd286.png)


## 資料來源

[input type="submit" 和"button"有什麼區別？](https://www.zhihu.com/question/20839977)
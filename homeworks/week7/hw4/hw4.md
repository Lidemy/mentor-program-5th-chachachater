# hw4

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/Hy8p5KcYd)

## 什麼是 DOM？

把 HTML 的所有內容轉換成另一種結構，這個結構是樹狀結構(DOM)，JS 會對 DOM 做修改，讓瀏覽器 render 的結果被改變

![一棵樹](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件的傳遞大原則是先捕獲再冒泡，target 本身沒有捕獲與冒泡之分

![範例](https://i.imgur.com/53NhnhZ.jpg)

* ABC 是巢狀的程式碼(意思是 A 包含 B && B 包含 C)，當在 C 上面點選的時候，事件的傳遞如圖片(簡化版，正確來說會從 Window 開始，如下圖)，需要注意的是 C 上面究竟是先發生 捕獲 還是先發生 冒泡，是由程式碼的先後來決定。
  > 補充: [target 事先冒泡還是先捕獲？chrome 更新後有變動](https://juejin.cn/post/6965682915141386254)

* 捕獲表示事件的傳遞是從 Window 往 eventTarget，冒泡表示事件的傳遞是從 eventTarget 往 Window 移動

* 冒泡或捕獲可以用`e.eventPhase`來查看，或是用 useCapture 參數來指定發生捕獲或冒泡時的行為 ↓
  ```javascript=
  target.addEventListener(type, listener, useCapture, wantsUntrusted)
  ```
> useCapture 參數可以指定，default 是 false，也就是使用capture.

#### 補充完整的傳遞路徑圖：

![](https://i.imgur.com/yYTlQuz.png)


## 什麼是 event delegation，為什麼我們需要它？

事件代理，一個雜事大總管的概念，以下圖(有點潦草)來說，如果要對每個"1,2,3"都做 click event 的監聽，除了可以手動給每一個"1,2,3"都加上監聽器之外，更簡單的方法就是找一個合適的事件代理人，每次點擊"1,2,3"的時候，事件都會經過這個代理人，例如 "A"。

透過在 "A" 上面加上監聽器，就可以捕獲到經過 A 的每個事件。

![](https://i.imgur.com/QNkNvxl.png)


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

我自己的解讀是`e.preventDefault()`與`e.stopPropagation()` 是完全不相關的兩件事。

### `e.preventDefault`

紫色箭頭處加上`e.preventDefault()`，事件的傳遞不受影響，但是 C 的預設行為會被取消。
> 注意：一旦 call 了preventDefault，在之後傳遞下去的事件裡面也會有效果。

![](https://i.imgur.com/KwK2J7w.jpg)

### `e.stopPropagation()`

紫色箭頭處加上`e.stopPropagation()`，事件的傳遞會被中斷，但如果有其他平行的事件則不受影響。
![](https://i.imgur.com/lLia6SB.jpg)

#### 假設 A,B,C 都是一個 a tag

* 對 B 加上 `e.preventDefault` 之後，點擊 B 之後也不會開啟超連結，但事件還是有完整的傳遞。

* 對 B 加上 `e.stopPropagation()` 之後，點擊 B 還是會開啟超連結，但事件的傳遞就停止了。

```htmlembedded=
<div class="A">
  <a href="https://tw.yahoo.com">top link to Yahoo奇摩</a>
  <div class="B">
    <a href="https://www.google.com.tw/">middle link to google</a>
    <div class="C">
      <a href="https://term.ptt.cc/">bottom link to ptt</a>
    </div>
  </div>
</div>

<script>
  document.querySelector('.B a:first-child')
    .addEventListener('click', (event) => {
      event.stopPropagation()
      console.log(event)
    })
</script>
```
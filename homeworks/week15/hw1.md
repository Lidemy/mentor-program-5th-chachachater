# W15 心得

## W11

開始正式寫 php了，負責路由的檔案瞬間變好多，如果有些常用的功能寫錯，就要連帶修改好多用到這功能的檔案（忘記使用 imort/export）。在寫 Blog HW 的時候覺得路由的處裡真很繁瑣XD，到底該返回上一頁還是導到其他頁面，我一度猶豫很久...，後來就隨自己的喜好決定了。

## W12

這周作業 todo list 我一開始是用原生 JS 和 CSS 寫的，因為自己我看清楚作業描述XD，之後改寫成 jquery 和 bootstrap 版本，一寫才發現有一些之前沒注意到的細節：
* 原來`$()` 選擇結果相當於`querySelectorAll()`，原來不是`querySelector()`
* `.val()` 是表單用的，`.text()`是表單以外用的，但`.text()`用在`<p contenteditable=true>`這個標籤的時候，似乎不會取到空行(沒有其他值)，它跟原生的 `innerText` 還是有差異
* `.text()` 會自動幫忙做 escapeHtmlChr()，看文件的確寫這件事↓(但好不明顯)
	> Unlike the .html() method, .text() can be used in both XML and HTML documents.
	> We need to be aware that this method **escapes** the string provided as necessary so that it will render correctly in HTML.
* 同時用 jquery 和 bootstrap 寫作業，發現到原來 bootstrap 滿多屬性的權重都好大，![](https://i.imgur.com/yqLebQc.png)，難怪我之後在 jQuery 用`$().fadeToggle()` 會不管用，本以為自己寫錯，才發現原來是權重被蓋過去，這樣看來用了 bootstrap 之後，如果想用 JS 做一些互動效果會滿不方便的。

說真的如果我一開始學前端就用 jquery 的話，一定不會發現到要做 escapeHtmlChr，因為工具都幫我弄好了XD

在做 todo 的時候，遇到`$_POST['todo']`沒辦法取得資料的問題，當始有找到解法但不知道為什麼，這周複習的時候去確認了問題的原因：忘記放 content-type。

我的程式碼, js：
```javascript=
function sendJson(data) {
JSON.stringfy() 做轉換
  const url = 'http://mentor-program.co/mtr04group3/Selena/week12/hw2/api_handle_add_todo.php'
  $.post(url, data) // 這裡忘記指定 content-type
    .done((response) => {
      console.log(response)
      if (!response.success) {
        alert(response.message)
        return
      }
      alert(response.message)
    })
    .fail((err) => {
      alert('Oops, something went wrong:', err)
      console.log(err)
    })
}
```

因為$_POST 只能取得 Content-type 為 application/x-www-form-urlencoded 或 multipart/form-data 的資料。

 > PHP文件: An associative array of variables passed to the current script via the HTTP POST method when using application/x-www-form-urlencoded or multipart/form-data as the HTTP Content-Type in the request.

如果沒加上上述的兩種 content-type 之一，jQuery 預設的處理方式會是這樣：
> jQuery 文件: dataType default, Intelligent Guess (xml, json, script, text, html).

[資料](https://xyz.cinc.biz/2013/06/php-filegetcontents-post.html)

## W13

這周是 Webpack 周，HW2 應該是目前寫下來效率最差的一份作業XD，因為有好多小細節容易被忘記，像是共用的變數沒有宣告成全域，忘記 import、函式撞名、jquery 選擇器撞名，其他檔案也撞名但自己沒發現（各種撞名）。

這周對留言板做測試，發現到之前都沒有測試過`0`這個 edge case
* `0` 對於 `isset()`, `empty()` 都會是 `true`，所以用這兩者判斷 `!isset()` 的時候要額外 0 這個 edge case

這周還學到 promise/fetch/async 系列的語法，不得不說 async 好好用，可讀性增加好多!!

## W14

來到聽說很困難的一周，開始自己買主機買網域最後架出網站，不過架完之後很有成就感。我這次是用 AWS 提供的虛擬主機，我覺得最難的點是 AWS 的操作介面不太好上手，即使用英文介面還是會看到很多 AWS 自己的專有名詞，理解起來需要一段時間。

取得主機和網域之後，開始部署後也遇到很多神奇問題，我還自己在遠端打開防火牆，然後沒打開 port22，造成自己鎖住自己的狀況，沒辦法用 ssh 遠端登入，當下超傻眼的，想說主機又不在我手上，我該怎麼把防火牆關閉(或是開啟 port 22)。最後是靠著 AWS 提供的 session manager 來成功連線。

## W15測驗心得

Q9和Q10是我常犯的錯誤QQ

Q1
我們可以用 url 的 query string 來處理資料，當使用者按下新增、刪除、check之類的按鈕時就傳送資料給後端，然後做 render().
傳送的資料格式則可以透過用 id 來代表使用者，todo="aaa" 表示 todo 項目，delete='true'、update='bbb'之類的格式，在對這個格式做解析來判斷使用者的操作。
或是也可以在後端寫不同路由來對應使用者的操作，例如刪除按鈕就把資料導到 handle_delete.php(url 傳送資料的筆數)。

Q2
還是可以做到，例如用 JSON 格式來表示 todo 是第幾項、要做的操作、修改的內容之類。
但如果後端不是我們可以管的，就要注意 CORS 的處理。

Q3
CORS 是瀏覽器把 response 給擋住不顯示，request/response 還是有正常完成傳送，所以可以請後端傳給使用者的 response 加上這些類型的 header
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Content-Type');
Q4
因為 .replace() 防範的不夠全面，還是有可能做到 XSS，例如<scr<*----*>ipt>，這樣就會被 .replace() 跳過了

Q5
yes
> 錯的答案，還需要考慮到可能有爆字數的惡意字串(因為這樣他就不算是 sql injection 攻擊了)

Q6
這邊的刪除文章方式是 刪除按鈕 > 送出 request(url 方式) > 後端接收 $_GET['id']，所以即使把刪除按鈕拿走，使用者還是可以透過修改 url 的方式來刪除文章。解決方法之一是檢查使用者的 session確認是文章作者本人後才刪除文章

Q7
在同一個網域下，不會受到同源政策的限制，但如果 request/response 來自不同元的話就需要做 CORS

Q8
yes

> 錯的答案，在這邊，雜湊的目的是避免資料庫被入侵之後裡面存放的明文密碼被駭客看光，存放雜湊後結果的話，即使被資料庫被入侵，駭客也(理論上)沒辦法轉換回明文密碼。
> bycrypt 是 JS 的第三方 library，按照小明的作法，是在前端就做雜湊，這樣再傳送給 request 給Server 的時候有可能被攔截封包而造成外洩，所以雜湊應該要在後端做，也就是傳送明文密碼過去，後端再做雜湊以及加鹽。
> 所以流程應該是： 讓使用者可以用明文密碼傳送給後端，後端將其 hash 之後，再跟資料庫內的對應 hash 做比較來驗證

Q9
要改成傳進一個函式，而不是"執行"一個函式
> 錯的答案，如果有用到非同步的操作像是 ajax和動態新增，就不會等們跑完而會直接顯示 console.log結果

Q10

因為沒有宣告 homedata

> 錯的答案，list 裡面存放物件，該物件沒有 selfId 這個 key。(因為錯誤訊息說的 undefined 不是指 selfId)
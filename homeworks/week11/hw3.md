# week11 hw3

## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

hash 具有以下特性：
* 是單向(不可逆)的函式，輸入一樣，輸出的結果保證一樣
* 不同輸入可能會有相同輸出(也就是發生"碰撞")
* 不定長度的輸入，都會得到固定長度的雜湊值

因為上述特性，經過 hash 過的資料通常難以從輸出反推出輸入，這點在資料庫被入侵、外洩時，可以確保流出的密碼(經過hash)不會被有心人還原成原始密碼。所以如果使用者忘記密碼了，是沒辦法從 server 給出原本的密碼，只能重設密碼(除非對方是存明碼，但這不是一個好方法)

encrypt 是透過金鑰(key)來進行加密與解密，以非對稱式加密為例，它會有兩組金鑰public key 和 private key，原則上 private key 只有使用者本身知道，public key則是交給別人做加密用。
使用者在傳遞資料時先請資料接收方先產生一對 publik key 和 private key，並把public key 傳過來，
傳送方用收到的 public key 做資料加密之後，當接收方收到密文時，可以用剛剛產生的 private key 解密，如此一來就可以確認資料來源沒有被偽造過(因為 public key 加密的內容只能用對應的 private key 解開)。

## `include`、`require`、`include_once`、`require_once` 的差別

### `include` 和 `require` 的差別

兩者都是引入別的檔案，差別在於使用時機以及報錯方式，`include` 通常在進行流程控制時使用，例如：`if($something){include(“somefile”);}`，`require` 通常放在程式碼最前面，在程式執行前就引入檔案。
`include` 在報錯之後，後面的程式碼還會繼續執行，`require` 在報錯之後，後面的程式碼就不會繼續執行。

### `include_once` 和 `require_once` 的差別

差別如上述↑，但會先檢查檔案有沒有被引入過，如果被引入過了，就不會再次引入。

## 請說明 SQL Injection 的攻擊原理以及防範方法

### 攻擊原理
透過編排 SQL 內容，來操作資料庫的攻擊方式，例如：
```php=
SELECT * FROM users WHERE username='%s' and password='$s'
```

當 username = aaa'# 的時候，程式語言會變成：
```php=
SELECT * FROM users WHERE username='aaa'#' and password='$s'
```
`#` 後面的語法會被註解掉，只要輸入 username 就可以取得資料庫的資料。

### 防範方法

使用"prepared statement"來解決，例如：
```php=
$stmt = $connection->prepare("SELECT * FROM users WHERE username=? and password=?");
$stmt->bind_param('ss', aaa, bbb); //假設帳號是aaa, 密碼是bbb
$stmt->execute();
```

`bind_param()` 有四種型別：
i – integer（整型）
d – double（雙精度浮點型）
s – string（字串）
b – BLOB（布林值）

## 請說明 XSS 的攻擊原理以及防範方法

cross-site-scripting，透過輸入 HTML 標籤來執行腳本，例如在留言板裡面輸入`<h1>123<h1>`，就會顯示 h1 標題的 123。

使用"htmlspecialchars"來解決，它會把一些特殊字元進行編碼，例如：`<` 會編碼成`&lt;`，編碼之後 HTML 會解釋成符號的 "小於"，而不是標籤中的"<" tag。
這個做法通常在顯示的時候才做處理，資料庫存的仍然是使用者輸入的原始資料。

## 請說明 CSRF 的攻擊原理以及防範方法

### 攻擊原理

在別的網址裡面對目標網頁進行攻擊的行為，例如下方程式碼，透過塞進一個隱藏的 frame 來接收表單結果，因為表單的傳送是在使用者端進行的，所以 cookie 的相關資料也會正常被傳送出去，最後就可以透過這個表單來對目標網頁進行攻擊，如此一來，相當於使用者自己在不知情的情況下，完成了一個操作。

```htmlembedded=
<iframe style="display:none" name="csrf-frame"></iframe>
<form method='POST' action='https://small-min.blog.com/delete' target="csrf-frame" id="csrf-form">
  <input type='hidden' name='id' value='3'>
  <input type='submit' value='submit'>
</form>
<script>document.getElementById("csrf-form").submit()</script>
```

### 防範方法

* 加上圖形驗證碼、簡訊驗證碼，每次使用者進行一個動作前都要通過驗證後才執行。
* 加上 CSRF token，透過在表單裡面傳送一段只有 server 知道的 token 來做驗證，例如：`<input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>`
* Double Submit Cookie，server 在傳送的表單裡面會加入一個隨機的 token 並且讓使用這把這組 token 存在 cookie 裡面(`Set-Cookie: csrftoken=fj1iro2jro12ijoi1`)，所以這個 token 同時在表單以及 cookie 裡面。最後，當使用者傳送表單的時候，server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken，是否相等，就可以知道是不是使用者發的了。
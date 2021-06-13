# week9 hw2

## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

### VARCHAR(M)

存放的資料最大字元數是 variable (可變動的)，最多可以存放`M`個字元，`M`必須介於 1 到 2¹⁶-1 (= 65535)
佔有的空間大小是 1 + `c` bytes (for M ≤ 255)，或 2 + `c` bytes (for 256 ≤ M ≤ 65535)

### TEXT

存放的資料最大字元數是 fixed (固定的)，固定存放 65535 個字元，所以在設定資料庫的時候，不能輸入它的最大值
佔有的空間大小是 1 + `c` bytes (for M ≤ 255)，或 2 + `c` bytes (for 256 ≤ M ≤ 65535)

**注意：**VARCHAR 跟 TEXT 可以存放的資料字元長度都是 variable (可變動的)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

HTTP cookies 是存放在使用者端的文字檔，通常是在 server 回傳的 response 裡面要求瀏覽器去做 cookie 設定，目的是使無狀態的 HTTP 變成有狀態的 HTTP，透過 cookie 實作出 session 的概念。常用的地方包括：維持登入狀態、分析使用者行為或其他個人化管理。

透過在 request header 加上`Set-Cookie: sessionId=38afes7a8`來設定 cookie 的屬性，其他額外屬性例如`Domain=mozilla.org`，用來設定該 cookie 可以被傳送的 domain 範圍。

cookie 在每次使用者端送出 request 的時候都會隨著 header 一起送出，可以用開發者工具來看到相關資訊，例如：
![](https://i.imgur.com/oA99iL3.png)



## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

密碼可以用 hash 來存放/傳送，或是用金鑰來做加密，避免資料庫洩露資料或是封包被攔截之後，明文密碼直接被看到
SQL injection
XSS
註冊時輸入驗證碼(避免機器人申請帳號)，做輸入兩次密碼來確保密碼正確性以及密碼的複雜度

## 資料來源
[Difference between VARCHAR and TEXT in MySQL](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)
[Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
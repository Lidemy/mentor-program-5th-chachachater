## 請以自己的話解釋 API 是什麼

API 是一個會根據傳進去的 request 來回傳對應的 respond 的程式介面。如果以我自己的理解來比喻，reqset 和 API 和 response 之間的運作比較像是：
> 「server 藉由 API 來提供特定服務給 client，而 client 可以透過這個 API 來跟 server 要求特定 response。
> 兩者之間的，request / response 會共同遵守一個規範來做溝通，request 會告訴 API 自己想要做的事情以及其他相關資訊（好讓 API 可以客製化 response），API 收到之後會回傳相對應的 response」

從上面的解釋也可以知道一些 API 的特色：
1. server 提供給你（client）的服務你才可以用，沒給的服務你都不能用。
1. API 的目的是方便兩者之間的資料交換，交換的資料會透過純文字的形式來交換。

### 用生活化的例子來解釋：
API 的概念類似於網路購物平台，客戶面對的是購物平台網站（API），客戶必須根據購物平台的介面來操作（只能使用 API 有提供的服務），才可以下單想要的商品（傳出正確的 request）。
賣家可以從購物平台網站看到客戶要求的資訊（request），然後再通過購物平台網站回傳對應的銷售訊息（response）。
### 較實作方面的解釋：
* server 和 client 為了要知道該怎麼表達自己所想要傳達的訊息，它們會一起遵守一個共同的 protocol。以 Web APi 來說，request 和 respond 的結構則會根據 HTTP protocol* 來制定，結構上有三個部分：status line、header、body，例如：![httpmsgstructure2](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)
（圖片來源: https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#status_line）

* 要注意的是 request 和 respond 它們彼此之間遵守的是一個規範，封包之間交換的也都是純文字，API 一般都會透過 **XML** 或是 **JSON** 的純文字格式來做封包傳輸，所以雖然從瀏覽器後台查看 request/response 可以看到已經整整齊齊排版好的格式，但要記得它們實際上只是純文字。
    
#### 補充

現在因為資訊安全，大部分都使用　HTTPs　這個協定，跟 HTTP 相比，它多用到了 SSL 或 TLS 來做加密

### Status line

負責記錄 **HTTP method** (GET, POST, PATCH, DELETE...)、request target (例如 url)、protocol version、status code、status text 等資訊，status line 的內容根據送出（入）的是 request 或 respond 而會有所不同。例如：
```htmlmixed=
GET /home.html HTTP/1.1
```

#### HTTP method
request 用來告訴 API 它想要做的動作，可能是單純取得資源（GET, PUT, POST），或是修改資源（DELETE, PATCH）...等

### Header

header 用來存放額外資訊，以下面的 GET request （只放上一部分）為例：
```htmlmixed=
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```
 
* request header 裡面通常會有第 3 行的`User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0` 這個 User-Agent header，可以把 client 端的相關資訊（以這邊來說，client 是使用火狐瀏覽器）告訴 server。
* 另一個例子則是第 4-6 行的 Accept-* headers，是用來跟 server 說 client 端想要接收的 response 類型，例如從`Accept-Language: en-US,en;q=0.5`這個 header 就可以知道 client 使用的語言是英語語系。
* 從上面的例子也可以知道，headers 可以有很多種類，並且是 optional (可以有 header，也可以沒有)，並且可以透過自己修改 headers 的內容來向 server 拿到特定資料。

### Body

用來記錄主要資訊，例如 response 的 body 通常會有 HTML、CSS、JS，request body 根據 HTTP method，而可能沒會有 body (例如 GET, HEAD, DELETE 之類的 HTTP method)。

### 文獻
* [An overview of HTTP
](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
* [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
* [Request header
](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
* [A typical HTTP session](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)
* [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### 418 I'm a teapot
一個因為愚人節而出現的狀態碼，實際上不是正式的 HTTP 狀態碼。

### 414 Request-URI Too Long
request 送的 URL 太長，例如使用 GET method 傳送太多的 query string 的時候可能發生，這時候可以改用 POST method 來傳送。

### 100 Continue
表示 server 有接收到 request，要求 client 繼續傳送 request，request 已經完成的話則忽略。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

參考 hw1 的 API 文件做出來的 API:

Base URL: https://rainbow-restaurant.com

| 說明| Method | path| 參數| 範例|
| ---------------- | ------ | ---------- | ------- | -----|
| 回傳所有餐廳資料 | GET| /restaurants| _limit:限制回傳資料數量 | /restaurants?_limit=5 |
| 回傳單一餐廳資料 | GET    | /restaurants /:id | --------| restaurants /:10      |
| 刪除餐廳| DELETE | /restaurants /:id | --------| -------- |
| 新增餐廳| POST   | /restaurants| name: 餐廳名稱| --------|
| 更改餐廳| PATCH  | /restaurants /:id | name: 餐廳名稱 | -------- |

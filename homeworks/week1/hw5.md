# hw5：簡答題

## 請解釋後端與前端的差異

概括來說，**前端**處裡的是使用者看得到、操作得到的部分，也就是送出 client request 給 server 之前的工作以及接收到 server response 之後的工作，**後端**則是使用者看不到、不能直接操作的部分，也就是把負責處理前端送來的 client request 以及送出 server response。
![示意圖](https://i.imgur.com/c5JhnC1.png)

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情

1. 從按下 Enter 的那一刻，瀏覽器會向 DNS 伺服器送出網域名稱 google.com，找出網域名稱的對應 IP address (google server 的位置)。
2. 瀏覽器會向找到的 IP address(172.217.160.78)送出 request，要對方交出關鍵字「Javascript」的搜尋結果
    > 根據使用的 protocal 不同，可以送出的 request 種類有HTTP, HTTPS, HTTP/2
3. Server 收到 request，經過 database 處理之後送出 respond (HTML, CSS, JS, json, xml ...等)
4. 瀏覽器收到 respond 然後進行 render，以 Chrome 的 Webkit engine 為例，流程如下：
    1. parse HTML 然後構成 DOM (= 把 HTML element 轉換成 nodes )
    2. parse CSS 然後構成 CSSOM
    3. DOM + CSSOM 構成(attach) render tree (= 排列 visual elements 的顯示順序)
        > 如何attach?
    4. render tree 進行 layout (把每個 visual elements 用座標來定位顯示位置)
    5. 遍歷 render tree 然後用 `paint()` method，最後透過 UI infrastructure component 來顯示使用者看到的最終畫面。

    ![render process](https://i.imgur.com/WQeQrYS.png)

### 補充說明一下 Parsing

> Parsing a document means translating it to a structure the code can use.

parsing 就是把 document **排列**成 樹狀結構 的過程，例如：
![parsing](https://i.imgur.com/85bp2me.png)

### Parsing grammars

Parsing(排列)是根據程式語言的語法來進行，這邊的語法指的是 BNF.

CS 用 Backus–Naur form or Backus normal form (BNF) 來代稱計算機使用的語言/語法，就是程式語言拉，因為程式語言的語法(文法?)都是 context free grammar.

### Parser–Lexer combination

parsing 分兩個階段:lexical analysis and syntax analysis.

1. Lexer 負責把 input 分割為標記
2. Syntax analysis 則會根據標記來找出對應的 rules, 然後放到 tree 的 node 裡面

> 參考資料:[How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#layout), [What Happens When Your Browser Requests a Web Page?](https://vanseodesign.com/web-design/browser-requests/)

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. `echo "hello world"`：單純印出一句話
2. `chmod`：修改檔案權限，例如：`chmod 664 README.md`，r => 4, w => 2, x => 1 
![示意圖](https://lh3.googleusercontent.com/proxy/HbKCrV2FTpYEtBmDQQqJcrga0sS0OU4oeDQ9B6Y9dtmL-z1NatjM7oC-iNyxmOtxad03RpYoVLVQ7pdYcH31dBlfoKXs4ivQzSxEdawGFabR917a7VqZpohehL15i8OSIEAmX0UlTA)
3. nslookup：查詢 DNS 回應是否正常，以及看到 IP

    ```
    $ nslookup google.com
    Non-authoritative answer:
    Server:  dns.hinet.net
    Address:  2001:b000:168::2

    Name:    google.com
    Addresses:  2404:6800:4012:1::200e
              172.217.27.142

    ```

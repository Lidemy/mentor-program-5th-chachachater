# week8 hw3

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/Hk4F4-2__)

## 什麼是 Ajax？

Asynchronous Javascript And Xml，目前已經是個統稱，表示用 Javascript 以**非同步**的方式來送出/接收資料，資料的格式以純文字的 JSON、XML(較少見)來傳送。

使用「非同步」的特點是：當使用者透過瀏覽器來送出一個 request 的時候，使用者不用等到瀏覽器取得 response 之後再作後續動作(也就是不用等待 response 送回來)，瀏覽器可以先做後續的其他事情。

## 用 Ajax 與我們用表單送出資料的差別在哪？

用表單送出的資料，需要等到接收到 response 之後才可以做後續動作，接收到 response 之後會將頁面轉到新網址。
> 但是這邊我不太懂為什麼會轉到新的 url?是瀏覽器本身的機制?是的話，不太明白後面的原理

Ajax 則不需要等接收到 response 之後才可以做後續動作。以發送一個 request 為例， browser 會把 request 的 callback 從 stack 放到 webapis 裡面，等到接收到 response 之後，再把 callback 放到 queque 裡面，最後等到 stack 為空狀態時，再透過 eventloop 把 callback 放到 stack 裡面去執行，而且不會把頁面轉到新網址，可以停留在原本的頁面。
> 這邊說的 stack, eventloop, queque 的概念可以去看 What the hell is eventloop 這個 youtube 影片會比較好理解

下方圖片是引用 What the hell is eventloop 這個youtube 演講影片，以比較圖形化的方式說明非同步在 browser 的執行方式，可以把圖片裡面的 setTimeout() 代換成 request 來理解。
![](https://i.imgur.com/pr6WzdT.png)

### 延伸

> 上面段落描述了瀏覽器的非同步的運作方式，那麼在 NodeJS 這個執行環境裡面是如何達到非同步的運作方式?

瀏覽器裡面有 stack, webapis, queque, eventloop 來查成非同步。NodeJS 的執行環境有全域和區域(stack、heap)，進一步的非同步方式，詢問助教之後提到要朝 V8 engine 這個關鍵字去搜尋

## JSONP 是什麼？

JSON with Padding，瀏覽器的同源政策會對 response 的處理做限制。但是有些標籤不會受到同源政策的限制，例如 img 標籤，以及 script 標籤，瀏覽器在接收到 response body 之後會直接執行而不受同源政策的限制，所以說也可以透過這些標籤來取得資料。

這個方法的限制則是 request 的形式只能透過 GET method，因為只能透過 HTML 標籤的 url 來送出 request。

## 要如何存取跨網域的 API？

看執行環境，如果是 NodeJS 的話，存取跨網域的 API 時不會受到同源政策的限制。

如果是瀏覽器的話，對方 server 要在 response 放上 access-control-allow-origin: (有其他類似功能的 header，不只這一個)這個 header
> 是否放上這個 header的選擇權在 Server 端

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

week4 是使用 NodeJS 這個 runtime 來執行 JS，week8 則是使用瀏覽器 這個 runtime 來執行 JS。

在瀏覽器裡面因為資訊安全的關係，有個叫做「Same origin policy」，簡單來說就是送出 request 的頁面的 url domain 需要和回傳 response 的 domain 相同，才是同源。
> 相同協定(HTTP != HTTPs)相同主機位置相同 port => 同源

如果是不同源的話，通常送出 request 之後，因為同源政策的關係會被瀏覽器**擋下來**，除非對方 server 的 response 有提供 `access-control-allow-origin:` (有其他類似功能的 header，不只這一個)這個 header
> 沒有其他解法，為了安全性，總不能隨便發 request 就能取得資料吧(?)

> 需要注意的是，response 還是有接收到，只是因為瀏覽器把它擋下來所以才看不到

但是，這個同源政策是**瀏覽器**做的限制，所以用 NodeJS 發出 request 的話就不會受到它的限制，因此 week4 沒有遇到這個問題。

### 延伸

#### CORS

前面有提到 Same origin policy 這個概念，那如果想要在不同來源之間傳資料該怎麼辦 => CORS !
這個規範會在 request 加上 "Access-Control-Allow-Origin"(有其他類似的header) 這個 http header

#### Preflight Request

CORS 把 request 分為兩種，簡單請求和非簡單請求，後者因為會夾帶一些使用者資料，所以會在送出 request 之前，預先送出一個 request (Preflight Request)，目的就是「透過 Preflight Request 去確認後續的請求能否送出」
> 一個重要資訊要先確認可以安全交出去，才交出去的概念


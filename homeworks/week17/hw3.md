# Week17 hw3：簡答題

## 什麼是 MVC？

MVC 是一種程式開發的架構，將程式碼根據功能來分成三種類，model 負責資料邏輯部分，view 負責畫面呈現，controller 負責流程管理。
> 但查資料之後發現它好像已經不是一個嚴謹的專有名詞了，反而比較像是一種思考模式，彼此的分工有時不是很能分得開。

以一個部落格為例，MVC 的分工可以是這樣：model 部分負責對資料庫的 CRUD，controller 部分則是使用 model 的函式來取得資料然後傳給 view，view 使用從 controller 那邊接收到的資料來做畫面的渲染。

所以當使用者的瀏覽器對 server 發出一個 request，server 會根據路由來呼叫對應的 controller，controller 使用 model 來取得資料然後傳給 view 做渲染，view 再把渲染完畢的資料傳給 controller，controller 最後回傳 response 給使用者的瀏覽器。

> https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/
> https://ithelp.ithome.com.tw/articles/10187675
> https://blog.turn.tw/?p=1539

## 請寫下這週部署的心得

部署變更輕鬆了...!!所以這次的部署紀錄也變短，我覺得蠻快就完成了，比較難的部分反而是不熟悉 sequelize 的操作...
這次不用做 webpack 就可以部署成功了，但程式碼裡面有用到不同的 require package，我認為是因為使用框架的原因，不知道是不是這樣?

[實作紀錄：將 express 部署到 Heroku](/tVdEvjn4Q2u4c0DVE_MjCA)

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

最大的感受就是程式碼的可讀性大大的提升了，路由的管理可以統一由一個檔案來負責（ex: index.js），不用像之前 PHP 需要根據每個路由都分別寫一個程式檔並且程式檔還會同時做資料庫的存取、畫面渲染，分工不明確。
相較之下，用 exprss + MVC 架構之後分工就明顯許多，這次有用到 sequelize 來操作資料庫，一開始用很不習慣但上手之後覺得好用，至少不用再像之前 PHP 的時候一樣，常常懷疑自己的 SQL query 有沒有寫錯。 ejs 也很好用，可以簡單得把 JS 嵌入 HTML 之中，排版起來也變得更容易了。

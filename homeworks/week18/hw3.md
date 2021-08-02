# W18 HW4

## 什麼是反向代理（Reverse proxy）？
client > Proxy server > Server a, b, c 之一...，使用者不知道自己的 request 會送到哪個 server。

使用代理伺服器來接收使用者的 request，並傳給對應的伺服器，代理伺服器接收到伺服器回傳的 response 之後再傳給使用者

為什麼要這樣?
* 因為不想要在 url 欄位輸入 1.1.1.1:5001 之類的 port，看起來很醜而且會暴露使用哪個 port 或是伺服器的 IP。
* 使用 reverse proxy 的話就可以做到例如：使用80 port 做為總入口，根據要求(subdomain)再導到不同門(port, server)，也就是一種負載均衡
* 提供 Web 的對於 DoS/DDoS 的防護

## 什麼是 ORM？

Object-Relational Mapping，中文是物件關係對映。顧名思義，就是用物件的方式來操作資料庫，而不需要使用 SQL 語法來操作資料庫。

## 什麼是 N+1 problem？

當要查詢一(a)對多(b)關係的資料時，不是使用 left join 來做查詢，而是先查詢 a 的資料，再用 a.id 之類的方式來查出關聯的 b 資料，例如有一個 car table 和 wheel table，首先會先下`SELECT * FROM Cars;`，再對取得的 car 做 forEach() `SELECT * FROM Cars;`，第一個 query 做一次，第二個 query 做了 n 次。

目前看到的解決方法是：先把 wheel 的資料都取出來再自己做關聯，或是使用 sequelize 的 Eager Loading/Lazy Loading，[文件](https://sequelize.org/master/manual/assocs.html#fetching-associations---eager-loading-vs-lazy-loading)
# Week14 hw3

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/ryJkGHEn_)

## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### 以比喻來說明

每個網路上的設備都有它專屬的身分證來代表它這個設備，也就是所謂的 IP。但是光看一串身分證數字實在不是很好記，所以每個設備都有一個英文名稱來做代表，也就是所謂的 Domain name system (域名系統)。如此一來我們在網路上想要找到 `www.google.com` 這個網址所提供服務的設備時，不需要輸入繁長的 IP，只需要輸入前面提到的網址就可以連線到它的設備。

### 以實作來說

基於 TCP/IP protocol 所建立的網路模型，每個連接到網路的設備（host）都需要有一個獨特的識別碼來辨識不同設備，這個識別碼就是所謂的 IP。目前產生 IP 的規則普遍是使用 IPv4，更新的規則則是 IPv6。

實作來說，當我們在送出 request 到 `www.google.com` 的時候，其實就是送到 `2404:6800:4012:1::2004`這個 IP，可以自己在 CLI 輸入`ping www.google.com -a` 指令查看結果（下圖），
![](https://i.imgur.com/e8matlE.png)

由此可知，送出 request 到網路上的某一個設備時，可以靠 IP 來辨認該設備，額外使用一個特定名稱（例如`www.google.com`）來做辨認的目的是方便人們記憶，而這個特定名稱就是由所謂的 Domain name system(域名系統) 來做管理，用來查詢每個 Domain name 對應的 IP，例如 GOOGLE 就有提供 public DNS server，或是 ISP 也有提供這個服務。

### Google DNS

Google 提供的 DNS Server IP 是 8.8.8.8 和 8.8.4.4，對 Google 來說，提供這項服務的好處是他們可以直接蒐集到每個 client 送出的 request 內容來對他們的搜尋引擎、廣告投放做優化。

與使用 ISP 的 DNS Server 相比，使用 Google Server 對使用者的好處則是：
* 有提供 DNS over TLS (DoT) 和 DNS over HTTPS (DoH) 這兩項資安防護
* Domain name ←→ IP 有做更新的時候，更新通常會比較快，才不會讓使用者連接到舊的 IP
* DNS Server 設備如果距離使用者比較近的話，連線速度會比較快
* 提供的 cache 較大，查詢 IP 的時候會比較快
* 提供 DNSSEC (DNS security extension standard)，使用 Hash 和金鑰坐資安防護
* ISP 可能會對 DNS query 做 filter, redirect...等，但 Google 則不會，哪邊比較好就要看使用需求了

## 資料庫的 ACID 是什麼？

資料庫做一次 query 不能完成的操作，例如轉帳。為了保證資料庫操作的正確，需要符合 ACID 這四個特性：

原子性 atomicity: 確保操作全部成功或全部失敗
一致性 consistency: 操作前和操作後，錢的總數要相同
隔離性 isolation: 不能同時改一個值
持久性 durability，動作完成之後，資料還在

例如↓，在`commit()`之後才會執行 query，所以也可以在一次`commit()`裡面塞很多 query，然後依次執行，效率會比較好。
```php=
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("UPDATE FROM money SET amount = 20");
$conn->query("UPDATE FROM money SET sum = 10");
$conn->commit();
```
(MYISAM 不支援、innoDB 支援)

## 什麼是資料庫的 lock？為什麼我們需要 lock？

當同時有多筆 request 需要對資料庫操作的時候，可能因為接收到每個 request 的時間不同，而造成操作錯誤。例如網路的限時搶購，如果同時有很多人對同一個商品搶購，假設商品限量 10 個，A 下單一次買了 8 個，但在 A 的 request 被處理之前，另外一個人 B 先送出 request 來查看商品數量，這時候送出的 response 就會顯示商品還剩下 10 個，這時候如果 B 也買了 8 個，就會造成超賣的結果。

為了避免多筆 request 對資料庫操作可能產生的錯誤，需要在每一次的 trancaction 裡面加上 LOCK，確保第一次動作完成才進行下一次動作。

例如↓，第 3 行把 table 'products' 的 id = 1 row 鎖起來，等到`UPDATE`完之後才可以做下一次的操作。``

```php=
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("UPDATE amount FROM products WHERE id = 1 for update");
$conn->query("UPDATE FROM products SET sum = 10");
$conn->commit();
```

## NoSQL 跟 SQL 的差別在哪裡？

SQL, 關聯式資料庫
* 依照資料的特性進行分門別類，把相同特性的資料存放在同個 table，再根據 schema，使用`JOIN`把 table 連接起來。

NoSQL, Not only SQL
* 沒有 schema
* 用 key-value 存（例如 JSON 格式）
* 不支援 JOIN
* 通常用來存結構不固定的資料，ex log

## 參考資料

[深入了解IP位址與子網路遮罩](https://www.netadmin.com.tw/netadmin/zh-tw/technology/D5162EE38674405EADB022E0802A05B2)
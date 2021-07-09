# week14 hw1：短網址系統設計

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/ByP7y_D3_)

![](https://i.imgur.com/A8si5ZA.png)
* Load Balancer: 用來自動分配新進來的 request 要導到哪一台 Server
* Cache Server: 用來存放經常查詢的短網址
* Master DB: 負責做資料庫的寫入/更新/刪除
* Slave DB: 負責做資料庫的讀取
* Auto-scaling: 當一台主機不夠負荷的時候，新增新的主機（AWS 提供的服務）
* Cache Server: 例如 Redis

## request

左邊是申請短網址用，右邊是查詢短網址用。

![](https://i.imgur.com/rftJgzB.png)

> 資料來源：[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
> [系統設計101](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/backend-architecture-101-5c425e760a13)
> [AWS Load Balance 基本概念介紹](https://medium.com/@chihsuan/aws-load-balance-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5%E4%BB%8B%E7%B4%B9-33c30a59b596)
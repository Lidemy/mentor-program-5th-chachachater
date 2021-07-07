# 使用 AWS 雲端主機部署網站的流程 + 除錯紀錄

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/BycsvIXnd)

> 流程主要是參考 [AWS、LAMP](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/) 和 [設定子網](https://nicolakacha.coderbridge.io/2020/09/16/launch-website/) 的流程，不過我還是遇到一些問題，所以也一併記錄除錯過程在最後面

前情提要：
* 從 W6 開始，作業寫了餐廳網站、Twitch API 串接網站等，它們屬於靜態網站，不需要透過 Server 做額外處理，可以在 github 直接部署，相關設定與 url 如下：
  ![](https://i.imgur.com/AIl7UXF.png)
* W9 開始，需要自己建 DB 和 Server，使用的是 Xampp 這個程式來做管理（類似 LAMP，同時把 db、server、ftp 相關程式設定好的大補包），這裡所寫的作業(Blog, message-board, todo) 屬於動態網站，需要經過 Server 處理再 response 給 client，因此需要一個可以運行這些事情的主機，這時候我們是使用 Huli 提供的站台來上傳（運行）作業。
* 接著是 W14，開始要生出一個自己的站台來部署之前寫過的各種網站啦~

## 取得主機

主機主要可以分成實體主機和虛擬主機，例如圖片中的 VPS / Dedicated Host，實體主機一台就是給一個使用者用，虛擬主機則是把主機空間切割成獨立區塊，每個區塊分別給不同使用者使用（有點類似公共澡堂和自家浴室的感覺）。
![](https://i.imgur.com/R8Hj3jG.png)

這次選擇使用 AWS 的虛擬主機，因為它有提供一年免費的服務，但也有說明如果流量超過限制會開始收費，申請步驟如下：

1. 註冊 AWS 會員
1. 進入 「AWS 管理控制台」頁面
1. 這裡可以在右上角選擇主機所在的地區
   ![](https://i.imgur.com/sR7pYys.png)
1. 選擇「啟動虛擬主機」
1. 選擇「Ubuntu Server 18.04 LTS (HVM), SSD Volume Typ」 > 選免費方案（綠色標章） > 接著就是一路 Next 到 Step 6 > Step 6 選擇「Add Rule」，新增「HTTP 跟 HTTPS」* > Step 7 會確認之前的設定，確認無誤之後按 Launch >　跳出選擇已有的私鑰或新建私鑰的視窗，選擇「新建私鑰」並下載保存（用來登入自己的主機）　＞　最後按　「Launch Instances」就建好了，選擇剛剛建立的主機(Instance)並按下 Connect。
2. 按下 Connect 之後，會顯示連線到主機的指令，開啟自己的 CLI 來做連線
```javascript=
chmod 400 <私鑰檔案路徑>
ssh -i "<私鑰檔案路徑>" ubuntu@ec2-< IPv4 位置>.us-east-2.compute.amazonaws.com
```

## 在主機上設定 LAMP

因為這次申請主機的目的是部署網站，所以要建立 php, server...等在主機上面，才可以提供網站給 client 使用，在 CLI 連線到虛擬主機之後，做下面的步驟。

### 裝 Server

1. 更新虛擬主機的 Ubuntu 系統，`sudo apt update && sudo apt upgrade && sudo apt dist-upgrade`
1. 安裝 Tasksel，`sudo apt install tasksel`
1. 用 Tasksel 下載 lamp-server，`sudo tasksel install lamp-server`
2. 輸入 url `http://<Ipv4>/` 測試是否成功安裝 Server
![](https://i.imgur.com/VDrhQSd.png)

### 裝 phpmyadmin

1. 下載 phpmyadmin，`sudo apt install phpmyadmin`，下載完之後連接 apache2 並且設定 phpmyadmin 的密碼。
1. 改變 phpmyadmin 登入的設定，改成用密碼登入：
    ```javascript=
    sudo mysql -u root mysql
    ```
    ```javascript=
    UPDATE user SET plugin='mysql_native_password' WHERE User='root';
    FLUSH PRIVILEGES;
    ```
    ```javascript=
    exit
    ```
3. 接著設定密碼：
    ```javascript=
    sudo mysql_secure_installation
    ```
4. 設定完成之後，輸入 url `IPv4/phpmyadmin`測試是否可以成功登入 phpmyadmin

### 測試是否成功部署網站

1. 這個是虛擬主機的檔案目錄圖：
![](https://i.imgur.com/yIJ02IX.png)
1. 要對外提供使用者訪問的網站檔案要放在`/var/html/` 路徑下面，`/var/log` 則是放日誌的地方，如果部署過程發生了 google 也找不到解決方法的時候，不訪來這裡看看，我這次遇到的部署問題都是靠它解決的。
![](https://i.imgur.com/CQt5HSI.png)
1. 把之前寫的作業放到`/var/html/` 路徑下面之後，就可以到 url`<Ipv4>/檔案路徑`去查看，例如範例圖片中的 Todo 就可以去 `http://<Ipv4>/Lidemy/Todo/index.html`查看(URL 除了 query string 以外其實不分大小寫，但通常會用小寫)。

### 設定域名

1. 到 gendi.net 註冊並購買網域（選擇 .tw 的網域）以及設定 domain name
2. 進入管理介面 > 域名 > 選擇剛剛設定的 domain name > 區域檔紀錄 > 把類型 A 的 IPv4 改成 AWS 的 IP
3. 完成之後就可以用`<domainName>.tw/`

### 設定子網域

這個算是額外選項，一樣是用 CLI 操作，目的是要讓 `http://<Ipv4>/Lidemy/Todo/index.html`，可以直接用 `http://www.todo.umer.tw/` 的形式來連結。

以下面路徑的 Todo 為例：
![](https://i.imgur.com/CQt5HSI.png)

1. 首先要去複製 `/etc/apache2/sites-available` 路徑下面的`000-default.conf` 並命名`todo.conf`
![](https://i.imgur.com/4jgtg3u.png)
1. 修改裡面的內容，修改成第12-14行的樣子，第22-23是日誌也可以一併修改，可以記錄各種錯誤發生的情況，日誌可以去`/var/log`查看。

```c=
<VirtualHost *:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin webmaster@localhost
        ServerName Todo.Umer.tw
        ServerAlias www.Todo.Umer.tw
	DocumentRoot /var/www/html/Lidemy/Todo

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/Todo_error.log
	CustomLog ${APACHE_LOG_DIR}/Todo_access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet

```
3. 最後存檔，並輸入指令`sudo a2ensite todo.conf` 重啟設定檔，然後再輸入指令`sudo service apache2 restart` 來重啟 Server。
4. 去 gandi 設定 domain name
![](https://i.imgur.com/DmGaf8Z.png)
5. 輸入 url 來測試是否成功設定，`http://www.todo.umer.tw/`

### 設定 File Zilla

這個算是額外選項，單靠 CLI 其實就可以管理虛擬主機了，如果想要用圖形化的方式方便上傳檔案的話，可以考慮安裝它。

[AWS 透過 FileZilla 使用 key-pairs 登入 AWS EC2 存取檔案](http://www.jysblog.com/coding/web/aws-%E9%80%8F%E9%81%8E-filezilla-%E4%BD%BF%E7%94%A8-key-pairs-%E7%99%BB%E5%85%A5-aws-ec2-%E5%AD%98%E5%8F%96%E6%AA%94%E6%A1%88/)


## 設定 SSL 憑證

未申請 SSL 憑證的網站，在 Chrome 裡面會顯示 "Not secure" 的提醒。
![](https://i.imgur.com/rVWUXk5.png)

一般 SSL 憑證都是需要付費申請才有的，這次使用 [Let's Encrypt](https://letsencrypt.org/zh-tw/getting-started/) 這家憑證頒發機構所提供的免付費憑證。進入[安裝教學網頁](https://certbot.eff.org/)，選好雲端主機的 OS 和 Server 種類之後，就可以根據提供的指令進襲安裝。

1. 安裝 snapd (EC2 的 Ubuntu 已經有內建)
1. 更新 snapd: `sudo snap install core; sudo snap refresh core`
1. 安裝 Certbot: `sudo snap install --classic certbot`
1. 確認 Cerbot 有安裝完成: `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
1. 設定要使用 SSL 的網址: `sudo certbot --apache`，紅色框框處
   ![](https://i.imgur.com/XxMcyVo.png)
1. 重啟 Cerbot: `sudo certbot renew --dry-run`
2. 回到剛剛申請憑證的網址，使用 https 查詢可以看到鎖頭出現
    ![](https://i.imgur.com/IqcFjzI.png)


## 除錯紀錄

### 靜態網站可以正常顯示，動態網站也可以正常顯示，但卻連接不到資料庫!?

首先我已經確認`connection.php`的連線指令`$connection = new mysqli('localhost', 'username' , 'password' , 'db_name');` 是正確無誤的。

然後也 google 不到有效的解法，最後去主機的 `/var/log/apache2` 下面查看日誌，發現到這一行
```javascript=
 PHP Warning:  require_once(connection.php): failed to open stream: No such file or directory in /var/<省略>/Todo/api_todo.php on line 2
```
原來是我的檔案名稱 `connection.php` 寫錯。

### 出現 connect ECONNREFUSED <Ipv4>:443

(Postman 顯示的錯誤訊息↓)
![](https://i.imgur.com/L71cU1l.png)

port 443 是 HTTPS 使用，但我當時沒有申請 SSL 憑證(要錢)，連線到主機的時候也不會看到有座 SSL 的鎖頭圖示。
![](https://i.imgur.com/VRxrKbN.png)

出現錯誤的原因是 Url 寫錯，不是 `https` 而是 `http`。



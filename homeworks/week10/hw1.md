# W10 hw1

## week10:
* 把綜合能力測驗完成了，滿有趣的，而且如果把自己代入製作者的角度，就滿容易想到解法的，像這次的測驗遊戲為例，大概可以知道是想測試 6-9 周學到的內容，然後再想想甚麼內容是拿能來考人，考慮到這遊戲是自己寫的，能考的內容大概就 query string、開發者工具 這些，就跟我玩一寫解謎遊戲的方法一樣XD
* 這次複習周還有把之前的幾篇文章(小明前端系列)再看一遍，有比較懂文章提到的各種技術出現的原因了，因為寫了更多的 CSS、JS和 PHP XD，然後也查了一直想達成的CSS 的多行省略符號"..."的效果該怎麼更好的達成和一些 CSS 時候的疑惑：
  * 動態網頁 !== SPA(動態新增的網頁)
  * CSS 的 [margin 也可以有負數](https://css-tricks.com/negative-margins/)
  * [CSS 的多行省略](https://zi.media/@carlos-studiocom/post/Wgeq4A)
  * CSS preprocessor: 讓 CSS 有變數操作的功能
  * PostCSS: 處理 prefix
  * jQuery: 解決瀏覽器不同的問題
  * MVC: 分工合作
  * MPA: 一個動作對應一個路由
  * SPA: 後端輸出一份資料給前段做渲染
  * SSR: 先做初步渲染的 SPA

## week9: 

這周開始學習到後端，第一周的時候一直以為 server 和 database 是同樣的東西，到這周開始明白兩者是不同的個體，database 單純是放資料資料的地方，這些資料要怎麼被加工則是由 server 來處理，兩者的關係好比食材與料理，生的食材要經過廚師這個 server 來處理才可以變成上桌給客人的料理。  這周在寫 php 的時候，總覺得排版難度大大增加，特別是在要把`<?php ?>`嵌入 HTML 裡面的時候，總覺得怎麼排版都不是很好讀。另一個難題則是作業變複雜了，開始寫程式前最好把路由規劃好，然後編寫程式碼的時候就要邊做測試，才可以比較即時的知道錯的地方在哪。 因為之前都沒接觸過 php 和 sql 語言，這周有強烈感受到學習效率的緩慢XD，CRUD 的語法甚麼時候要加雙引號、單引號這些我也滿容易搞混的，而且後來自己寫了幾次後發現，如果變數的值是單一個單字例如`'a'`，就要用引號框住，不然資料庫會抓不到資料。

這周還有學到 SESSION 的概念我覺得滿重要的，原來它是一個抽象的狀態，一開始我還以為它大概是 COOKIE 的另一種說法...

## week8: 

* 串接 twitch 的一周，這周作寫寫得滿愉快的，特別是跟著檢討影片學到把不同功能的程式碼分別用函式來處理，最後讓程式碼變得很簡潔這件事，讓我發現到自己原本寫的程式碼可以分更多函式出來，然後助教也有提到當看到程式碼出現相似的重複時就可以嘗試用函式來減少重複的部分。
* 這周還有學到 Ajax 這個詞在使用上原來已經是一個統稱了，用來表示"非同步"的意思，原來這種專有名詞也會隨時間而改變它的意思，我以前一值以為專有名詞的定義應該是穩定不變的，原來不是這樣。
* 在寫作業的時候有用到 XMLHttpRequest，在做錯誤處理的時候發現到XMLHttpRequest.status 返回的值不一定是 statusCode，回去看文件才知道他的返回值和我預想的不一樣，不一定會返回狀態碼，還分為0-4的 request 傳送狀態。


## week7: 
* 作業從這周開始有結合 HTML、JS、CSS來做出作品了。看影片的時候提到 sessionStorage 的功能，然後給這周作業 todolist 加上了 sessionStorage ，原本卡在該怎麼存放資料的格式，後來想到不是有 JSON 可以用嘛!?  然後就寫了之前串 API 常看到但自己一直沒寫過的 JSON，然後也使用到了`.map()`, `.filter()`，真的挺好用的。
* 然後，這周的挑戰題(輪播)讓我印象深刻，因為寫不出來，看了之前學員寫的程式碼還是寫不出XD，之後就適時地放棄了，但我覺得這功能真的滿好玩的，在很多網站也常常看到

## week6: 
* 這周開始寫 CSS 了，這周切版作業其實寫得很茫然也不太曉得該怎麼改善，因為是第一次寫，等之後作業寫多幾次之後才有比較熟悉它的語法的感覺。
* 嘗試做了漢堡選單，在自己寫過 CSS 之後，常常會在滑手機的時候注意到每個網頁的設計，但有時候忘記要加上漢堡選單，已經把選單功能寫好了，之後要加上漢堡選單的功能的話，就需要重構部分程式碼，希望之後學 SCSS 之後可以改善這個引入的不方便QQ
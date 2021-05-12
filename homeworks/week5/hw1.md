# week 5 hw1

## 前四週心得與解題心得

### week 1

第一周主要是在學習 git 的時候遇到比較多困難，主要是自己還不太熟悉用純文字的 CLI 來進行版本管理，總是有一種沒有看到實際畫面（GUI）的不踏實感，再加上目前（和以後）主要都會是自己一個人在做版本管理以及目前累積的檔案還不多，還不能感受到它的強大之處，可能如果有跟團題合作過或累積的專案多了的話的話，才會感受到它的偉大之處吧XD。

### week 2

第二周開始解題，因為有先看過一些 [ALG101] 所以上手的滿快的，但我記得我一開始也是和其他同學一樣在要怎麼處裡輸入和輸出的問題卡很久，也不是很理解 return / console.log 的區別，在解題的時候也會覺得不知道該從哪裡下手XD，後來是直接用筆在筆記本上面寫程式碼該一步一步做的事情之後，再把這些事情轉換成程式碼，這樣效率就變得比較好了，但還是好希望自己可以直接在 VSCode 上面就可以打出解題的程式碼結構QQ，這部分可能需要很~長的時間來培養。

在看 [CS101] 的演算法部分的時候，我可以把 bubble sort, insertion sort, selection sort 寫成程式碼，但後面兩個 merge sort, quick sort 就還處在可以理解但寫不出程式碼的階段 ~"~

### week3

從 week3 開始進入 eslint 的世界了，一開始使用就噴出 100+ 個錯誤，結果才發現是因為我都用 4 個空格在寫程式碼，改過之後錯誤就到一半以下了，我自己覺得 eslint 滿有效用的，算是給所有人一個共同的寫程式碼守則吧？這樣我也不會出現每次寫程式碼都用不同的排版或縮行的狀況了，我自己常被抓出來的錯誤有：縮行跟換行格式、沒有使用解構、const / let 不分。不過我的 git bash 似乎是因為沒安裝額外套件，所以不會像其他同學在 Matterost 上面提到，出現一片紅的情況，我這邊單純就是顯示有多少錯誤，沒有一堆顏色讓我心情滿好的XD

### 挑戰題部分

每周的挑戰題真的滿難的，只有第一周的挑戰題我可以完全靠自己，第二、三周就需要參考範例了，雖然自己腦袋裡都有大概的解法，但實作程式碼之後發現還是會卡住，像是二分搜尋法那題我會一直卡在輸入的 array 是奇數還是偶數的問題，但後來發現其實沒差，因為可以用 `Math.floor()`來解決。

第三周的挑戰題又花了更多時間，前前後後大概有到 7 小時在處理，自己真的好弱XD，這邊遇到的困難是沒有想到可以用`二維陣列 arr[y][x] 來存放走到每一個點的最小步數` 這件事情，還有要怎麼讓 `A 點往上下左右去移動一步` 這件事情。

總結下來，大致上遇到的困難都是：
看挑戰題的提示之後，可以知道大概該怎麼做，但實際寫程式碼之後會發現做不出來而需要去看參考範例，這部分該怎麼解我還沒有想到QQ

另外也覺得應該設個寫挑戰題的停損點，不然其他跟課和寫作業、複習、修改作業的時間會被壓縮到。

### 解題心得
#### Lidemy HTTP Challenge 心得

我解到第 11 關，共花了 120 分鐘，解到第 10 關的時候最開心，除了發現後面還可以解之外，也看到前幾屆同學的 github 留言，下面大家都在簽到，所以我也跟風簽了一下XD。後面五關的心得我額外寫在[這邊](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/H17rSK1u_)。
解關卡的時候覺得 request library 真的是簡單又好用的套件，滿多題靠它 carry 過的，真是有夠罩。解的過程中發現自己對 "content-type", "http authentication", "form" 這些概念還不清楚，查資料之後認為是以下的意思：

##### HTTP authentication

HTTP 有內建的 framework 可以對 client requset 做驗證，驗證流程如下：
![](https://i.imgur.com/cqalagm.png)
(圖片來源：https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

收到 request 之後，server 回傳要做認證的 response，client 再根據資訊回傳 request，附上`Authorization: <type> <credentials>` 這個 header。

> 資料來源：[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

##### POST 提供資料給 server 的幾種方式
POST method 跟 GET mehtod 的不同在於，POST 會傳送額外資訊(form data，放在 body)給 sever，這份額外資訊的傳送格式(content type)有幾種：

1. `content type:'application/x-www-form-urlencoded'`
1. `content type:'multipart/form-data'`
1. `content type:'text/plain'`
1. `content type:'application/json'`
(這邊則是放在 header 裡面)

至於該怎麼寫出一個帶有特定 form 的 POSE request，[這裡有範例可以看](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data#on_the_client_side_defining_how_to_send_the_data)，或是用 request npm 有預設好的 method 可以使用。

除了直接傳送資料以外，也可以用 XMLHttpRequest 來傳送 POST 的資料(?)
> 資料來源：
> [POST](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods/POST)
> [Sending form data](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)

#### LIOJ 大平台

```javascript=
const line = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4]
let arr = []
  let ct = 1
  let num
  let tmp
  for (let i = 0; i < line.length - 1; i++) {
    num = line[i]
    tmp = line[i + 1]
    if (num === tmp) {
      ct = ct + 1
    } else {
      arr.push(ct)
      ct = 1
    }
  }
  arr.push(ct)
  
//
line is 1,1,2,2,2,3,3,3,4
arr is 2,3,3,1
```
我的解法是:
 
1. **用 arr 來存放每個平台的長度**

 用迴圈來判斷 lines[i] 和 lines [i+1]是否相同，相同的話計數器 +1 (初始值為 1)，不同的時候就把計數器的值 push 到 arr 並且把計數器回歸到初始值 1。
 
 因此當跑到第 2 層平台之後，會把第 1 層平台的長度 push 到 arr；當跑到第 3 層平台之後，會把第 2 層平台的長度 push 到 arr；當跑到第 4 層平台之後，會把第 3 層平台的長度 push 到 arr。
 當跑到第 4 層平台之後，就不會再 push 了，所以程式碼第 16 行有再額外做一次 push。
 
2. **最後再用 bubble sort 來找出最大值**

這題我容易忘記「每次 push 到 arr 都是 push 上一層平台的長度」這件事，也就是程式碼第 16 行。

#### LIOJ 貪婪的小偷

需要想辦法找出物品的價值順序，也就是需要進行排列。這邊採用 Bubblt sort。

使用雙層迴圈，內層迴圈的工作：
第 1 次:
把 array 的最大值找出來，移動到最後的 index
第 2 次:
把 array 的第 2 大值找出來，移動到倒數第 2 個的 index
第 3 次:
把 array 的第 3 大值找出來，移動到倒數第 3 個的 index
......以此類推。
找出最大、第 2 大值的方法則是: 把 array element 進行左右相比，左邊比右邊大的話就進行互換，否則不做任何動作。

#### LIOJ 不合群的人

這題要注意的是一些edge case 例如：全部都是 A 或 B　的情況，或是只有一個人自己玩的情況。

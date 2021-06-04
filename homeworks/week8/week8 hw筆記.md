# week8 hw筆記

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/Hkt9ygnOO)

## hw1

### API error 處理
測試發現這次 API 會有兩種錯誤，一種是回傳 error JSON，另一種是狀態碼 500，如下：

![](https://i.imgur.com/VvCuUE8.png)
(error JSON)
![](https://i.imgur.com/mtM2yqb.png)
(狀態碼 500)

錯誤 JSON 是用 switch case 來處理，狀態碼 500 的處理方法是：
```javascript=
if (request.status >= 200 && request.status < 400) {
try {
  json = request.response
  result = JSON.parse(json)
} catch {
  console.log('something went wrong with json')
  alert('取得JSON錯誤, 請再試一次')
}
```

### 小細節

左邊圖片的"獎品"欄位沒有設 line-height，"獎項"欄位有設 line-height，造成文字沒有辦法貼齊(line-height 越大的話越明顯)，兩邊都設定相同 line-height 之後就會向右邊欄位依樣貼齊了
![](https://i.imgur.com/gzmnN3N.png)

給抽獎結果加上白底，增加閱讀體驗：
![](https://i.imgur.com/xVj4uGo.png)



## hw2

### 把 API、動態新增HTML元素分開用不同 function 來寫

* `getTopGame()`:取得前五熱門的遊戲名稱，存放到陣列

* `getStreams(game)`:取得遊戲名稱的前 20 熱門的實況影片的 JSON

* `alertError(reasonStr, statuscode)`: 發生錯誤時，用alert來跳出提醒視窗

* `appendNav(gameArr, callback)`: 給 navbar 加上監聽器&動態新增實況影片，其他函式(`appendGames(game)`、`appendStreams(json)`)也是同理

### 點選 navbar 的不同遊戲時，選單會維持黑底的功能

```javascript=
for (let i = 0; i < gameArr.length; i++) {
  const navRightLi = document.querySelector(`.nav-right li:nth-child(${i + 1})`)
  navRightLi.addEventListener('click', (e) => {
    callback(gameArr[i])
    document.querySelector('.active').classList.remove('active') // 點選 nav 的遊戲之後, 顏色會變黑底
    e.target.classList.add('active')
  })
}
```

![](https://i.imgur.com/0LEVdey.gif)


### XMLHttpRequest

要注意先後順序，先 open() 再加load監聽器，最後才 send，例如：
```javascript=
request.open('GET', url, true)
request.setRequestHeader()
request.addEventListener('load', cb)
request.send()
```


### 加上 error 處理

XMLHttpRequest 有支援可監視 request 傳輸進度的 DOM 進度事件，一共有這幾種類型：
```javascript=
function addListeners(xhr) {
  xhr.addEventListener('loadstart', handleEvent);
  xhr.addEventListener('load', handleEvent);
  xhr.addEventListener('loadend', handleEvent);
  xhr.addEventListener('progress', handleEvent);
  xhr.addEventListener('error', handleEvent);
  xhr.addEventListener('abort', handleEvent);
}
```

這次作業有用到 error event，目的是處理當 apiurl 輸入錯誤時，跳出 alert() 並印出狀態碼，如下：

![](https://i.imgur.com/dOBOaXD.png)

另外也有對 JSON error、非 400系列的狀態碼作錯誤處理，如下：

```javascript=
try {
  response = request.response
  json = JSON.parse(response)
} catch (error) {
  alert(`oops, something went wrong with JSON...`)
}
```

```javascript=
if (request.status >= 400) {
  alertError('handling request/response', request.status)
}
```

#### XMLHttpRequest.status 返回的值不一定是 statusCode
> 使用的時候一直以為一定是返回 statusCode...，然後做錯誤測試的時候一直收到 XMLHttpRequest.status = 0...想說到底怎麼回事XD

AJAX的 XMLHttpRequest.status 會根據 readyState 存放的 XMLHttpRequest 的狀態(從 0 到 4 )而發生不同變化。

0: 請求未初始化
1: 伺服器連接已建立
2: 請求已接收
3: 請求處理中
4: 請求已完成，且響應已就緒

status 的值一定會返回運行這些步驟的結果：
1、If the state is UNSENT or OPENED, return 0.（如果狀態是UNSENT或者OPENED，返回0）
2、If the error flag is set, return 0.（如果錯誤標籤被設置，返回0）
3、Return the HTTP status code.（返回HTTP狀態碼）

其他可以改進的項目:
* 增加影片框框圓角化(but 黑灰背景不明顯)
* error404 頁面
* 影片跟 YT 一樣會自己動
* 載入更多實況影片
* 固定在選重的欄位
* 
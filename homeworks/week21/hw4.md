# W21HW4 簡答題

## 為什麼我們需要 React？可以不用嗎？

React 一般被用來寫 SPA，所謂的 SPA 是指不換頁，更準確來說是瀏覽器不會送出 request。
要達成不換頁（SPA）但又可以更改網頁顯示的內容，要怎麼判斷使用者該去哪個 router？在 React 裡面是透過 HashRouter 和 BrowserRouter 來達成改變網址的功能，例如加上一個`#`，這麼一來就可以判斷目前使用者在哪一個 router 但又不會真的把 request 送出。

由上述可以知道，React 可以用來寫 SPA，如果不想使用 React 但又想想出 SPA，我們可以透過 HTML5 提供的 History API 來操作網址列，同時又不會真的送出 request。

## React 的思考模式跟以前的思考模式有什麼不一樣？

就是，很多不一樣XD。
最大的不同我覺得是要可以使用 useState，透過改變 state 來重新 render 畫面這件事。

在其他思考模式不同的點還有：
* 以往在切版的時候會考慮整體畫面怎麼切，現在則是從功能面來考慮怎麼分 component。
* 要對 JS 更加熟悉，例如這次作業就有用到滿多我之前不常用的功能，`Array.fill()`, `map()`，然後一些常用的功能在 React 的 JSX其實不能用，例如`forEach`，要改變自己之前寫 JS 的習慣。
* component 之間會有層級關係，父和子 component 之間要如何傳遞資料也是需要考慮的點。
## state 跟 props 的差別在哪裡？

state 是用來記錄使用者不可預測的操作狀態並且在改變的時候會重新 render，props 則是作為 component 的參數（接收往下傳來的資料）來使用。

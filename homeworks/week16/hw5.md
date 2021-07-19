# 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

印象最深的是 EC/AO/VO 的執行方式，因為我在 week5 的挑戰題就踩過類似的坑了，回去看之前卡住的程式碼（省略一部分）：
```js
let gameId = -1
const baseUrlA = 'https://api.twitch.tv/helix/games'
const baseUrlB = 'https://api.twitch.tv/helix/streams'
let gameName = 'Fortnite'

const outHeader = {
  url: `${baseUrlA}?name=${gameName}`
}

function outCallback() {
  gameId = 9999
  console.log('out:', inHeader.url)
  inCallback()
}

const inHeader = {
  url: `${baseUrlB}?game_id=${gameId}`
}

function inCallback() {
  console.log('in:', inHeader.url)
  console.log('inTemplate:', `${baseUrlB}?game_id=${gameId}`)
}

outCallback()
```
結果會是下面這樣：
```js
// out: https://api.twitch.tv/helix/streams?game_id=-1
// in: https://api.twitch.tv/helix/streams?game_id=-1
// inTemplate: https://api.twitch.tv/helix/streams?game_id=9999
```
當時的我以為程式碼裡面的三個 `console.log()` 結果都會是 `https://api.twitch.tv/helix/streams?game_id=9999`，因為認為程式碼是一行一行往下執行的。這周學到 EC/AO/VO 之後才知道程式碼不是我所想的那種一行一行往下的方式在執行，而是做完初始化之後才開始執行函式或賦值。

## this

this 跟函式怎麼被呼叫有關(arrow function 是例外)，出現的原因之一是為了更好的達成物件導向的概念，比如說同一個規格的遙控器可以對很多台相同的電視做操作，用 this 則可以把電視跟遙控器之間做綁定。之前學其他程式語言例如 java 的時候，我覺得 this 就是綁定抽象物件跟 instance 用的，但在 JS 裡面 this 無所不在，只是通常都在物件裡面使用

## instance 使用`.__proto__` 這個屬性來串接生出這個 instance 的媽媽的`.prototype`

`prototype` 這個概念出現的原因之一是為了讓某些物件可以被共用。

這邊要注意的是誰把誰實作出來，彼此之間的關係我覺得是這樣(不太確定)
![](https://i.imgur.com/vGohsri.png)

```javascript
function Dog(name) {
  this.name = name
}

var d = new Dog('nick')
console.log(d.__proto__.__proto__ === Object.prototype) // true，因為`Dog.prototype`是個物件
console.log(Dog.__proto__ === Function.prototype) // true，因為 Dog 其實就是個 Function 的 instance
console.log(Function.prototype.__proto__ === Object.prototype) // true
```

## Closure

Closure，在一個函式裡面回傳另一個函式（還是不懂它的命名意義，它到底 closed 的點在哪...??）

初始化的時候，會產生下列物件(?)，注意，是初始化，不是執行：
* 每個 EC 都有一個 scope chain 會被建立，scope chain 的內容是 自己的 AO + 自己的`.[[Scope]]`內容
* 函式的 EC 裡面是 AO，非函式的 EC 裡面是 VO
* 在 EC 裡面，如果有函式被宣告，就會有額外的 `.[[Scope]]` 屬性，它的內容會跟宣告時產生的 EC 的 scopeChain 內容相同

要注意的點是，宣告和執行的差異（之一）是：
* 宣告函式 => 產生`.[[Scope]]`
* 執行函式 => 是從`.[[Scope]]`開始尋找需要的變數、函式
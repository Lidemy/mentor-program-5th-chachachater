# Week13 hw4：簡答題

[好讀版](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/rkJcYy5hu)

## Webpack 是做什麼用的？可以不用它嗎？

> Webpack 是一個模組化工具，通常在開發網頁的時候會用到，可以不用它但會讓網頁程式的開發/後續維護變得麻煩

網頁所使用的執行環境是瀏覽器，不同執行環境支援的模組化規範可能不同，例如 NodeJS 支援的模組化規範是 CommonJS，使用`require/module.exports` 語法來使用模組。當執行環境不是 NodeJS 時，就不一定支援這種語法，例如瀏覽器就沒有支援，
所以瀏覽器不行一併讀取 npm 安裝的模組或是`require/module.exports` 語法。

ES6 之後開始有正式的模組化規範，就是`import/export`，但支援度也不是很好，像是它在 NodeJS 上還是屬於 experimental 狀態，使用前需要做[額外處理](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html)，在瀏覽器上面使用模組也需要做一些額外處理，例如`  <script src="./main.js" type="module"></script>`，並且副檔名要加上".js"，如果引用的是npm 安裝的模組，就需要再額外指定模組路徑，而且還需要考慮到不同瀏覽器版本不同的問題，維護起來不是很方便。

統整一下，模組化在瀏覽器上面執行起來的一些麻煩的地方：
* `import/export`的支援度不好
* 使用 `import/export` 前要做一些額外處理
* npm 安裝的模組不能直接`import/export`
![](https://i.imgur.com/Vwxri0a.png)
![](https://i.imgur.com/O6ts2wO.png)
![](https://i.imgur.com/Q8ejcrA.png)

「不支援的語法可以透過自己寫一套工具（程式碼）來讓它被支援」，Webpack 的出現就是為了解決模組化在不同執行環境所遇到的困擾而出現，相關設定可以去`webpack.config.js` 做設定。除了 JS 模組之外，Webpack 還可以讓其他非 JS 的檔案例如 SCSS, CSS, 圖片檔...等透過**Loader**來引入，就像它的官方圖片一樣，任何檔案都可以透過特定的 loader 來引入。
>  Loaders allow webpack to process other types of files and convert them into valid modules 
![](https://i.imgur.com/kapokDP.png)

## gulp 跟 webpack 有什麼不一樣？

Webpack 是一個模組化工具， gulp 是一個管理流程的工具

## CSS Selector 權重的計算方式為何？

根據 [W3C](https://drafts.csswg.org/selectors-3/#specificity) 提到的 CSS specificity 規則如下：
* count the number of ID selectors in the selector (= a)
* count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= b)
* count the number of type selectors and pseudo-elements in the selector (= c)
* ignore the universal selector

```
Examples:
*               /* a=0 b=0 c=0 -> specificity =   0 */
LI              /* a=0 b=0 c=1 -> specificity =   1 */
UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
#x34y           /* a=1 b=0 c=0 -> specificity = 100 */
#s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
```

從範例中可以看到，CSS specificity 是由 a-b-c 三個區塊來計算，區塊間的優先度是 a > b > c，因此 1-0-0 的優先度會大於 0-0-3，另外需要注意的是這三個區塊的數值是由 8-bit unsigned integer 來儲存，所以儲存的最大值是 255，當區塊的數值大於 255 時就會進位。

還有兩個較特殊的 selector: important 和 inline style，不會參與 CSS specificity，網頁會直接取用它們

> Although technically !important has nothing to do with specificity, it interacts directly with it.


> 參考資料
> [Webpack](https://webpack.js.org/)
> [IM007 CSS Specificity / 權重](https://hackmd.io/@tsungtingdu/HkG3DoaND)
> [What is the rule behind “CSS 256 Classes Override One ID”](https://stackoverflow.com/questions/12002845/what-is-the-rule-behind-css-256-classes-override-one-id)
> 
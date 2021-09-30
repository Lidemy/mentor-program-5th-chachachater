# W24HW2 簡答題

## Redux middleware 是什麼？

進入 reducer 之前，負責在 Store 第一線接收和處理 action 者，例如需要呼叫 API 的時候可以使用到。
![官方說明圖](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)
## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR，client side render，渲染再使用者端完成。
server 傳給瀏覽器的首先是簡單的HTML，瀏覽器根據 html 再去請求 js 資料，瀏覽器在接收到資料之後需要在自行處理(mount)並渲染成畫面，因此至少需要經過兩次請求，不會一次請求就得到已渲染完成的檔案，這次作業就是 CSR。
![csr](https://cdn.sanity.io/images/ay6gmb6r/production/65dbb3b9d1ed04e945232d80f3de9c015488cab0-700x393.png?w=729&fm=webp&fit=max&auto=format)
SSR，server side render，網頁的渲染是在 server 完成。
傳送給瀏覽器的資料是已渲染完的檔案，瀏覽器可以直接載入並顯示畫面，但這時候的畫面只有靜態內容，動態內容需要再去請求 js 資料。
![ssr](https://cdn.sanity.io/images/ay6gmb6r/production/65dbb3b9d1ed04e945232d80f3de9c015488cab0-700x393.png?w=729&fm=webp&fit=max&auto=format)

### 為什麼我們需要 SSR？

瀏覽器在做爬蟲的時候會送出 request 並蒐集回傳的資料，如果是 CSR，爬蟲蒐集到的資料不會是已渲染完成的檔案，需要瀏覽器載入畫面之後才可以爬到詳細資料，如果是 SSR，爬蟲蒐集到的資料就會是完整的網頁，在做 SEO 的時候較有利，此外 SSR 在 server 就做好渲染，可以減輕使用者端的載入壓力。
## React 提供了哪些原生的方法讓你實作 SSR？
* `renderToString()`，回傳 HTML string。
* `renderToStaticMarkup()`，一樣會回傳 HTML string，但是去除一些額外的 attribute 可以省去一些位元組。
* `ReactDOM.hydrate()` 跟上面兩者回傳的是靜態內容不同，如果 dom 節點已經 render 過，hydrate 就只會回傳 event handler (動態內容)。
## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

* Next.js (React)
* Nuxt.js (Vue)


> 資料
> https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16
> https://www.solutelabs.com/blog/client-side-vs-server-side-rendering-what-to-choose-when
> https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc
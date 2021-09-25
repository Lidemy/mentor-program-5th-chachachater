# W21HW2 簡答題
[好讀版( •̀ ω •́ )✧](https://hackmd.io/@ouR5x-oVSMy4d8R5uFsKNg/S1T85OcWK)
## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### useState
`const [state, setState] = useState(initialState);`
* 回傳一個 state 的值，以及更新 state，state 改變的時候會重新 render component。
* 重新 render 的時候，useState 回傳的第一個值會是最後更新的 state
### useEffect
接收函式，傳遞到 useEffect 的函式會在 render 完成，layout 完成之後執行。
useEffect 所接收的第二個參數（array）可以用來決定何時才要執行 useEffect 的函式。
如果 render 多次 component，在執行下一個 effect 前，上一個 effect 就已被清除。
### useContext
`const MyContext = React.createContext(defaultValue);`
* 傳一個預設值(defaultValue) 給`React.createContext()`，`React.createContext()` 會回傳 一個 context object。

`const value = useContext(MyContext);`
* `useContext()` 會接收一個 context object（React.createContext 的回傳值）並回傳該 context 目前的值。Context 的值是取決於距離上層 component 最近的 <MyContext.Provider> 的值。
當 <MyContext.Provider> 更新時，會重新 render。
### useReducer
```javascript=
const [state, dispatch] = useReducer(reducer, initialArg, init);

const reducer = (state, action) => { return newState }
````

* 當 useState 的邏輯複雜時適合使用，接受一個函式 reducer，reducer 會回傳現在的 state 以及其配套的 dispatch 方法（dispatch，我的理解是認為它是指 > state相關的邏輯方法）。
* 後面的兩個參數 initialArg 跟 init 則是跟初始化有關。
### useCallback

```javascript=
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
`useCallback()` 的第一個參數是一個 callback，第二個參數是 callback 的 dependency。useCallback 會回傳該 callback 的 memoized 版本，並且只有在 dependency 改變時才會更新。

### useMemo

```javascript=
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
`useMemo()` 的第一個參數是一個 callback，第二個參數是 callback 的 dependency。useMemo 會回傳該 callback 的 memoized 的**值**，並且只有在 dependency 改變時才會更新值。
### useRef
```javascript=
const refContainer = useRef(initialValue);
```
useRef 接收參數(initialValue)，回傳 mutable object。 可以在當資料改變，不需要再次 render 時使用它。

### useImperativeHandle
```javascript=
useImperativeHandle(ref, createHandle, [deps])
```
useImperativeHandle 會在使用到 ref 時，向父 component 暴露自定義的 instance 值。
以下面的範例來說，有 render 到 <FancyInput ref={inputRef} /> 的父 component 便能夠能呼叫 inputRef.current.focus()。


```javascript=
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
### useLayoutEffect

與 useEffect 用法相同，傳遞到 useEffect 的函式會在 render 完成，layout 完成之**前**執行。
### useDebugValue

```javascript=
useDebugValue(value)
```
用來在 React DevTools 中顯示自訂義 hook 的標籤。
## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
整體的順序可以參考[這裡](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)。
### Mounting

component 被放到 DOM 的時候觸發的順序如下
* `constructor()`，發生在component 被放到 DOM 之前，通常用來做初始化 state 和`bind()`
	```javascript=
	constructor(props) {
		super(props);
		// 不要在這裡調用 this.setState()
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);
	}
	```
* `getDerivedStateFromProps()`(少用到)，發生在 Mounting 和 Updating 的 render() 之前，用來更新 state
* `render()`，檢查`this.props` 和 `this.state`是否改變並回傳 element（或其他純函數，意思是在不修改 state 的情況下，回傳的值都會是相同的）
* `componentDidMount()`，component 被放到 DOM 之後立刻調用

### Updating
當 component 的 props 或 state 更新，重新渲染（re-rendered） DOM 時會觸發，觸發順序如下
* `getDerivedStateFromProps()`(少用到)，發生在執行 render 之前，根據回傳的值來判斷 state 或 props 是否發生變化，當有發生變化則回傳`true`。如果回傳`false`則不會調用`UNSAFE_componentWillUpdate()`，`render()` 和 `componentDidUpdate()`。
* `shouldComponentUpdate()`
* `render()`
* `getSnapshotBeforeUpdate()`(少用到)，發生在最新的一次 render 之前，可以在 component 發生改變之前從 DOM 裡面取得資料，回傳的資料會傳給 `componentDidUpdate()`
* `componentDidUpdate()`，發生在 DOM 更新之後立即調用

### Unmounting
component 從 DOM 移除的時候觸發的順序如下
* `componentWillUnmount()`，發生在 component 從 DOM 之上移除之前。
## 請問 class component 與 function component 的差別是什麼？

class component 使用物件導向的寫法並且是透過 `this` 來讀取資料，例如↓，這邊的 this 會在 3 秒之後顯示 user，但這邊會有延遲的問題，如果我們在 3 秒之內又改變了所點選的 user，那麼 this.user 的值也會改變，造成 render 出來的資料不是我們最先點選到的 user。
```javascript=
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
function component使用函式來寫 component，傳進去的參數不會因為 this 改變而改變 render 用到的資料。
```javascript=
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
uncontrolled component，沒有使用到 state 的 component。
ucontrolled component，有使用到 state 的 component。

> 資料來源： [1](https://zh-hant.reactjs.org/docs/hooks-reference.html) [2](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/) [3](https://overreacted.io/a-complete-guide-to-useeffect/)

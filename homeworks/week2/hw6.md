``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
![code](https://i.imgur.com/uJHLxXc.png)

//第一個 for
1. 執行第2行，設定變數 i 是 0，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 0 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 1，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 1 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 2，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 2 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 3，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 3 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 4，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 4 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 5，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第3行，檢查 arr 的第 5 個值是否 <= 0，檢查為 false，執行下一次的迴圈
1. 執行第2行，i++，i 變成 6，檢查 i 是否 < 6，檢查結果為 false，結束 if 迴圈
//第二個for
1. 執行第5行，設定變數 i 是 2，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第6行， arr 的第 1 個值加上 arr 的第 0 個值，得到 8，檢查 arr 的第 2 個值是否 !== 8，檢查結果為 false，執行下一次的迴圈
1. 執行第5行，i++，i 變成 3，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第6行， arr 的第 2 個值加上 arr 的第 1 個值，得到 13，檢查 arr 的第 3 個值是否 !== 13，檢查結果為 false，執行下一次的迴圈
1. 執行第5行，i++，i 變成 4，檢查 i 是否 < 6，檢查結果為 true，執行 if 迴圈
1. 執行第6行， arr 的第 3 個值加上 arr 的第 2 個值，得到 21，檢查 arr 的第 4 個值是否 !== 21，檢查結果為 true，回傳 invalid，執行結束
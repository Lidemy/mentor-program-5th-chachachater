## 交作業流程

# 如何交作業

首先要釐清一些容易讓我搞混的名詞：

* fork 是複製一個 respository 到本地端
* pull request又叫 PR 是在[GitHub]端 branch merge 的動作
* `git pull origin master` 是把版本拉到本地端的動作
* 遠端是[GitHub] 和 本地端是[Git] ，它們是各自獨立的，兩者的同步要靠自己的腦袋來記著

## 交作業步驟１ (開一個 test repository 做示範)

***所有操作都是在 branch 之上**

1. [申請一個 Lidemy 下面的 repository](https://classroom.github.com/a/yNNrtNyW)
1. fork 一個 respository 到本地端 : `git clone https://github.com/chachachater/test.git`
    > 因為是 fork 現有的 respository ，所以就不用 `git init` 了
1. 新增 branch : `git branch week1`
    > 注意注意：不要從根目錄 branch，建議 branch 要交作業的資料夾就好 (範例沒有層級之分所以沒有考慮到這點)
3. 切換到 branch : `git checkout week1`
4. 寫作業，寫完之後`git add .` 加到 git stage 裡面，再用 `git commit -m "Is it okay?"`
5. 放到遠端 `git push -u origin week1`
6. 最後再 PR 就可以了↓，完成 commit 之後， Github 部分就完成了
![示意圖](https://i.imgur.com/sOe5eox.png)

## 交作業步驟２

學習系統繳交作業，把 PR 的連結複製起來交出

## 作業被改完之後：同步兩端

> 作業被改完 = 助教會 merge master，然後把 branch 刪掉

delete branch :　`git branch -d week1`

`git pull origin main`

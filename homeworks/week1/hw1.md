## 交作業流程

# 如何交作業

首先要釐清一些容易讓我搞混的名詞：

* fork 是從[GitHub]複製一個別人的 respository 到自己的[GitHub]
* `git clone` 是把[GitHub]上面的 respository 抓到本地端
* pull request又叫 PR ，是在[GitHub]端 merge branch 的動作，至於是哪個 branch 合併到哪個 branch，可以在[GitHub]上面修改
* `git pull origin master` 是把某一個版本(branch)拉到本地端的動作
* 遠端是[GitHub] 和 本地端是[Git] ，它們是各自獨立的，兩者的同步可以用`git status`來確認，例如↓，**[Git]目前的版本已經跟[GitHub]的 666 版本同步**

```
aries@DESKTOP-386ATNN MINGW64 /c/thisIsGit/babala (666)
$ git status
On branch 666
Your branch is up to date with 'oriii/666'.

nothing to commit, working tree clean

```

### git fork 還有 git clone 有什麼差異？
* fork 一個 respository 的情況，通常都是複製 **別人的** respository，也就是說使用者本身不一定有 PR 的權限。 如果想要對別人的respository做修改（但又沒有 PR 權限），可以先 fork 對方的 respository 到自己的 [GitHub]，就可以對它自由 PR 了。
    * clone 是把一個 respository 從遠端[GitHub]抓到本地端[Git]的行為
    * fork 是在[GitHub]操作，clone是在[Git]操作

## 交作業步驟１ (開一個 test repository 做示範)

***所有操作都是在 branch 之上**

1. [申請一個 Lidemy 下面的 repository](https://classroom.github.com/a/yNNrtNyW)
1. 把 respository 複製（下載）到本地端 : `git clone https://github.com/chachachater/test.git`
    > 因為已經有在[GitHub]進行版本控制了，所以就不用 `git init` 了
1. 新增 branch : `git branch week1`
    > 注意：~~不要從根目錄 branch，建議 branch 要交作業的資料夾就好 (範例沒有層級之分所以沒有考慮到這點)~~ 開一個 branch 並不是開一個 directory 的意思，而是類似（虛擬上）產生一個平行的 directory，並且會和原始的 directory 做比較並且記錄兩者的檔案差異，之後根據這些紀錄的差異來合併 merge.
3. 切換到 branch : `git checkout week1`
4. 寫作業，寫完之後`git add .` 加到 git stage 裡面，再用 `git commit -m "Is it okay?"`
    > 要注意 `git add .` 只會把資料夾以下的檔案加入版本控制，如果更改的檔案在上層資料夾的話，並不會被加進去
6. 放到遠端 `git push -u origin week1`
7. 最後再 PR 就可以了↓，完成 commit 之後， Github 部分就完成了
![示意圖](https://i.imgur.com/sOe5eox.png)

## 交作業步驟２

學習系統繳交作業

## 作業被改完之後：同步兩端

> 助教確認OK之後會 merge master，然後把 branch 刪掉

delete branch :　`git branch -d week1`

`git clone https://github.com/chachachater/test.git`
* 如果 PR 沒過但是又把 delete branch的話，用`git pull`把檔案從 branch 拿回來

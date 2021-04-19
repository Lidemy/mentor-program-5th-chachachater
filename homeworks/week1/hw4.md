# hw4：跟你朋友介紹 Git

## Git 的基本概念

Git 是用來做版本控制的程式，控制的方法以「使用資料夾來管理一個笑話」做比喻的話：

1. 最原始的 **笑話A** 在經過一次更改變動(變成 **笑話A-1** )之後的紀錄會統一存放在 **資料夾1** 當中。
![1](https://i.imgur.com/bSDoWCg.png)

2. 當 **笑話A-1** 又再一次被更改變動(變成 **笑話A-2** )之後的紀錄會存放在 **資料夾A-2** 當中，之後每次更改都是這樣的管理方法。
![2](https://i.imgur.com/TJY7g5g.png)

3. 需要注意的是為了避免加到錯誤的版本，資料夾最後要進行 commit 的動作，才會成為 Git 真正可以控制的版本。
![3](https://i.imgur.com/fJXUpWP.png)

### 如果有很多笑話，每個笑話有不同版本的話
1. 不同笑話分別用不同 branch 來管理，之後再 merge 到 main branch.
2. 每個笑話有不同版本，有新的笑話版本的時候，可以開一個 branch 做管理，像圖片這樣↓（畫得不是很好看），之後再 merge 到 main branch，這樣 main 裡面的笑話就會是最新版本了。

[圖片](https://user-images.githubusercontent.com/71329979/115113390-b25c6600-9fbc-11eb-8426-be4c1647dd21.png)

## Git 的基礎使用

這邊就要來介紹實際上要如何使用 Git，首先要[下載](https://git-scm.com/)並安裝它，安裝完之後使用 Git Bash 並移動到 笑話A 所在的路徑。

1. 初始化版本控制：`git init`
2. 把修改後的　笑話A-1 加入資料夾：`git add 笑話A`
3. 資料夾最後要進行 commit 的動作：`git commit -m "修改第一次的笑話"`
4. 接下來的 笑話A-2 也是以此類推：

    ```
    git add 笑話A
    git commit -m "修改第二次的笑話"
    ```
5. 如果想確認有沒有修改成功的話，可以用`git status`來確認有沒有把笑話加進去版本控制
6. 最後來查看版本控制的情況：`git log`
7. 如果想要新增一個笑話，可以開一個 branch 來操作，`git branch 笑話B`，之後再用`git add 笑話B.txt`, `git commit -m "增加笑話B"` 就可以把笑話B加進去版本控制。當笑話B完成之後，用 `git merge 笑話B`，把笑話B 合併進去 main branch 裡面。
8. 如果有不同笑話版本，也適用步驟7的 branch 方式來管理。

<?php
  $username = null;
  if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
?>
<input class="burger-checkbox" type="checkbox" />
<div class="burger">
  <span></span>
  <span></span>
  <span></span>
</div>

<nav class="nav-block">
  <div class="title">光芒萬丈的官方網站</div>
  <div class="burger-detail">
    <div class="left-block">
        <div><a href="./index.php">首頁</a></div>
        <div><a href="./about.php">關於我</a></div>
        <div><a href="./all_articles.php">文章列表</a></div>
        <div><a href="#">分類專區</a></div>
    </div>
    <div class="right-block">
        <?php if(!$username) {?>
          <div><a href="./login.php">登入</a></div>
        <?php } ?>
        <?php if($username) {?>
          <div><a href="./handle_logout.php">登出</a></div>
        <?php } ?>
        <?php if($username) {?>
        <div><a href="./add_article.php">新增文章</a></div>
        <div><a href="./admin_article.php">管理後台</a></div>
        <?php } ?>
    </div>
  </div>
</nav>

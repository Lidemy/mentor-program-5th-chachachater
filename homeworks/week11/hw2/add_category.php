<?php
  session_start();
  require_once('./check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  $errcode = null;
  if(isset($_GET['errCode'])) {
    $errcode = (int)$_GET['errCode'];
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./normalize.css" />
  <link rel="stylesheet" href="./stylesheet.css" />
  <title>Blog</title>
</head>
<body class="debug">
  <?php include_once('./nav.php'); ?>
  <div class="banner">
    <div>
      <h1>存放技術之地 - 後台</h1>
      <p>Welcome to my blog</p>
    </div>
  </div>

  <div class="container">
    <form class="article-content" action="handle_add_category.php" method="POST">
      <h1>新增分類：</h1>
      <input type="text" name="category" placeholder="輸入分類名稱">
      <?php if($errcode === 1) { ?><p id="error-block">未輸入分類</p><?php } ?>
      <input type="submit" value="新增分類">
    </form>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>
</body>
</html>

<?php
  require_once('connection.php');
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./normalize.css" />
    <link rel="stylesheet" href="./stylesheet.css" />
    <title>Blog</title>
  </head>
  <body class="debug">
    <?php include_once('./nav.php'); ?>
    <div class="banner">
      <div>
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
    </div>

    <div class="container">
      <div class="article">
        <div class="article-title">歡迎來到，光芒萬丈的官方網站</div>
        <div class="detail-block about-block">
          (Test)嗨呦我是 Selena，這裡主要是存放各種人生紀錄，目前主要會以紀錄程式導師實驗計畫為主，遙遠的未來會記錄更多生活中的酸甜苦辣方便往後可以回顧一下自己的生活。
          目前最喜歡的三大作品：鋼鍊, abyss, chainsaw man
        </div>
      </div>
    </div>

    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>

  </body>
</html>

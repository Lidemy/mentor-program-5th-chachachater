<?php
  require_once('connection.php');

  $stmt = $connection->prepare('SELECT * FROM `selena_message_board_messages`;');
  $result = $stmt->execute();
  if (!$result) {
    die($connection->error);
  }
  $result = $stmt->get_result();

  $invalid = null;
  if(isset($_GET['invalid'])) {
    $invalid = $_GET['invalid'];
  }

  $errCode = null;
  if(isset($_GET['errCode'])) {
    $errCode = (int)$_GET['errCode'];
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./normalize.css" />
  <link rel="stylesheet" href="./stylesheet.css" />
  <title>Message-Board</title>
</head>
<body>
  <div class="warning">
    <p>警告!本網站為練習用，註冊時請勿使用任何真實的帳號或密碼。</p>
  </div>

  <div class="container">
    <div class="user-block">
        <h1>註冊</h1>
        <div class="input-block">
          <form action="handle_register.php" method="POST">
            <label for="nickname">nickname</label>
            <input type="text" id="nickname" name="nickname" placeholder="請輸入暱稱">
            <label for="username">username</label>
            <input type="text" id="username" name="username" placeholder="請輸入帳號">
            <label for="content">password</label>
            <input type="password" id="password" name="password" placeholder="請輸入密碼">
            <?php if($errCode === 2) { ?>
              <p style="font-size: 16px; color: gold; margin-top: 10px;">請輸入全部欄位內容再提交</p>
            <?php } ?>
            <?php if($errCode === 3) { ?>
              <p style="font-size: 16px; color: gold; margin-top: 10px;">帳號重複</p>
            <?php } ?>
            <input type="submit" value="提交">
          </form>
        </div>
        <button class="index-btn"><a href="index.php">首頁</a></button>
        <button class="login-btn"><a href="login.php">登入</a></button>
    </div>
  </div>
  <script></script>
</body>
</html>

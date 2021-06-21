<?php
  require_once('connection.php');

  $result = $connection->query('SELECT * FROM `selena_message_board_messages`;');
  if (!$result) {
    die($connection->error);
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
        <h1>登入</h1>
        <div class="input-block">
          <form action="handle_login.php" method="POST">
            <label for="username">username</label>
            <input type="text" id="username" name="username" placeholder="請輸入帳號">
            <label for="content">password</label>
            <input type="password" id="password" name="password" placeholder="請輸入密碼">
            <?php if($errCode === 4) { ?>
              <p class="invalid">請輸入全部欄位內容再提交</p>
            <?php } ?>
            <?php if($errCode === 5) { ?>
              <p class="invalid">username 或 password 錯誤，請重新提交</p>
            <?php } ?>
            <input type="submit" value="提交">
          </form>
        </div>
          <button class="sign-btn"><a href="index.php">首頁</a></button>
          <button class="login-btn"><a href="register.php">註冊</a></button>
      </div>
  </div>
  <script></script>
</body>
</html>
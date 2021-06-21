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
  <title>Blog</title>
</head>
<body class="debug">
  <div>
    <div class="user-block">
        <h1>Log In</h1>
        <div class="comment">
          <form action="handle_login.php" method="POST">
            <label for="username">USERNAME</label>
            <input type="text" id="username" name="username" placeholder="">
            <label for="content">PASSWORD</label>
            <input type="password" id="password" name="password" placeholder="">
            <?php if($errCode === 4) { ?>
              <p class="invalid">請輸入全部欄位內容再提交</p>
            <?php } ?>
            <?php if($errCode === 5) { ?>
              <p class="invalid">username 或 password 錯誤，請重新提交</p>
            <?php } ?>
            <input type="submit" value="SIGN IN">
          </form>
        </div>
    </div>
  </div>

  <script></script>
</body>
</html>
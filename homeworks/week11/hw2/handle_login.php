<?php
  require_once('connection.php');
  session_start();
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=2'); // 2 登入時，未完整輸入全部欄位
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = 'SELECT * FROM `selena_blog_admins` WHERE username=?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if(!$result) {
    die($connection->error);
  }
  $result = $stmt->get_result();
  if(!$result->num_rows) {
    header('Location: login.php?errCode=3'); // 3 登入時，帳號或密碼錯誤
    die();
  }

  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])){
    // 設定 COOKIE
    $_SESSION['username'] = $username;
    header('Location: index.php');
  }
  else {
    header('Location: login.php?errCode=3');
    die();
  }
?>

<?php
  require_once('connection.php');
  session_start();

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=4'); // 4 登入時，未完整輸入全部欄位
    die();
  }
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = 'SELECT * FROM `selena_message_board_users` WHERE username = ?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if(!$result) { // 正確的話會回傳 1
    die($connection->error);
  }
  $result = $stmt->get_result();
  if(!$result->num_rows) { // DB 沒有這組帳號的話會回傳 0
    header('Location: login.php?errCode=5'); // 5 登入時，帳號或密碼錯誤
    exit();
  }
  $row = $result->fetch_assoc();

  if(password_verify($password, $row['password'])){
    $_SESSION['username'] = $username; // 設定 COOKIE
    header('Location: index.php');
  } else {
    header('Location: login.php?errCode=5'); // 5 登入時，帳號或密碼錯誤
    exit();
  }
?>

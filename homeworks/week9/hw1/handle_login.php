<?php
  session_start();
  require_once('connection.php');
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=4'); // 4 登入時，未完整輸入全部欄位
    die();
  }


  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = 'select * from `selena_message_board_users` where username=?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  // 正確傳給 db 的話會回傳 1
  if(!$result) {
    die($connection->error);
  }
  // DB 沒有這組帳號的話會回傳 0
  $result = $stmt->get_result();
  if(!$result->num_rows) {
    header('Location: login.php?errCode=5'); // 5 登入時，帳號或密碼錯誤
    die();
  }

  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])){
    // 設定 COOKIE
    $_SESSION['username'] = $username;
    header('Location: index.php');
  }  else {
    header('Location: login.php?errCode=5');
    die();
  }
?>

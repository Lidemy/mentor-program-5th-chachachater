<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=2'); // 2 註冊時，未完整輸入全部欄位
    die();
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = 'user';

  $sql = 'INSERT INTO `selena_message_board_users`(`nickname`, `username`, `password`, `role`) values (?, ?, ?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ssss', $nickname, $username, $password, $role);
  $result = $stmt->execute();

  $err_code = $connection->errno;
  if($err_code === 1062) { // 1062 => username 重複
    header('Location: register.php?errCode=3');
    die();
  }
  if($err_code) { // 發生其他錯誤的處理
    echo '伺服器連線錯誤';
    echo $err_code;
    die($connection->error);
  }

  $_SESSION['username'] = $username; // 設定 cookie, 維持登入狀態
  header('Location: index.php');
?>

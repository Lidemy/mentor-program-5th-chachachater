<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  // 使用者沒有輸入完整內容的錯誤處理
  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=2'); // 2 註冊時，未完整輸入全部欄位
    die();
  }

  // 新增 content 到 DB
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = 'insert into `selena_message_board_users`(`nickname`, `username`, `password`) values (?, ?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();
  // 正確新增給 DB 的話會回傳 0
  $err_code = $connection->errno;

  // 1062 => username 重複
  if($err_code === 1062) {
    header('Location: register.php?errCode=3'); // 3 註冊時，username 重複
    die();
  }
  // 發生其他錯誤的處理
  if($err_code) {
    echo '伺服器連線錯誤';
    echo $err_code;
    die($connection->error);
  }

  // 設定 cookie, 維持登入狀態
  $_SESSION['username'] = $username;
  header('Location: index.php');
?>

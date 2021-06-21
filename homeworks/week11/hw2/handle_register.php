<?php
  require_once('connection.php');
  session_start();

  // 使用者沒有輸入完整內容的錯誤處理
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=2');
    die();
  }

  // 新增 content 到 DB
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = 'user';

  $sql = 'INSERT INTO `selena_blog_admins`(`username`, `password`) VALUES (?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();
  // 正確新增給 DB 的話會回傳 0
  $err_code = $connection->errno;

  // 1062 => username 重複
  if($err_code === 1062) {
    header('Location: register.php?errCode=3');
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

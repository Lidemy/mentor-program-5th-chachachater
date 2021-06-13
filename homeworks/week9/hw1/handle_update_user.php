<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  if (empty($_POST['nickname'])) {
    header('Location: index.php?errCode=1'); // 1 未輸入暱稱
    die('no nickname');
  }
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = 'update `selena_message_board_users` set nickname=? where username=?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  $err_code = $connection->errno;

  // 發生其他錯誤的處理
  if($err_code) {
    echo '伺服器連線錯誤';
    echo $err_code;
    die($connection->error);
  }

  header('Location: index.php');
?>

<?php
  session_start();
  require_once('check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  if (empty($_POST['nickname'])) {
    header('Location: index.php?errCode=1'); // 1 未輸入暱稱
    die();
  }
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = 'UPDATE `selena_message_board_users` SET nickname = ? WHERE username = ?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if(!$result) { // 正確的話會回傳 1
    die($connection->error);
  }
  header('Location: index.php');
?>

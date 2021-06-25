<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');
  require_once('check_permission.php');

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=0'); // 0 未輸入留言內容
    die();
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];

  $sql = 'INSERT INTO `selena_message_board_messages`(username, content) values (?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if(!$result) {  // 正確的話會回傳 1
    die($connection->error);
  }
  header('Location: index.php');
?>

<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  // 使用者沒有輸入留言的錯誤處理
  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=0');
    die();
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];

  // 新增留言到 "selena_message_board_messages" table
  $sql = 'insert into `selena_message_board_messages`(`username`, `content`) values (?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ss', $username, $content);

  $result = $stmt->execute();
  // 正確新增的話會回傳 1
  if(!$result) {
    die($connection->error);
  }

  header('Location: index.php');
?>

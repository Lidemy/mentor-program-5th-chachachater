<?php
  require_once('connection.php');

  function get_nickname ($username) {
    global $connection;
      // 從 "users" table 找到對應的 nickname
    $sql_get_nickname = sprintf(
      'select `nickname` from `selena_message_board_users` where `username` = "%s";',
      $username
    );
    $result_get_nickname = $connection->query($sql_get_nickname);
    // 正確的話會回傳 1
    if(!$result_get_nickname) {
      die($connection->error);
    }
    $row = $result_get_nickname->fetch_assoc();
    return $row['nickname'];
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>

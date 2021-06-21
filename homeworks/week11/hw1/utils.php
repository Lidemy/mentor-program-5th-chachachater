<?php
  require_once('connection.php');

  function get_nickname ($username) {
    global $connection;
    $stmt = $connection->prepare(
      "SELECT
        `nickname`
      FROM
        `selena_message_board_users`
      WHERE
        `username` = ?"
    );
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if(!$result) { // 正確的話會回傳 1
      die($connection->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $nickname = $row['nickname'];
    return $nickname;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function handle_role($role, $username) {
    global $connection;
    $sql = 
      "UPDATE
        `selena_message_board_users`
      SET
        role = ?
      WHERE
        username = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('ss', $role, $username);
    $result = $stmt->execute();
    if(!$result) {
      die($connection->error);
    }
  }

  function has_permission($role, $action) { // $action = add, edit_all, delete_all
    if($role === 'admin') {
      return true;
    }
    if($role === 'user') {
      return $action === 'add';
    }
    if($role === 'editor') {
      return $action !== 'add';
    }
    if($role === 'editor_edit_only') {
      return $action === 'edit';
    }
    if($role === 'editor_delete_only') {
      return $action === 'delete';
    }
    return false;
  }

  function get_role($username) {
    global $connection;
    $sql = 'SELECT * FROM `selena_message_board_users` WHERE username =?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if(!$result) { // 正確的話會回傳 1
      die($connection->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['role'];
  }

  function check_editor($role) {
    return ($role === 'editor' || $role === 'editor_edit_only' || $role === 'editor_delete_only');
  }

  function delete_comment($id, $username) { // 刪除留言
    global $connection;
    if($username) {
    $sql = 'UPDATE `selena_message_board_messages` SET is_deleted = 1 WHERE id = ? AND username = ?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    }
    if(!$username) {
    $sql = 'UPDATE `selena_message_board_messages` SET is_deleted = 1 WHERE id = ?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $id);
    }
    $result = $stmt->execute();
    if(!$result) { // 正確的話會回傳 1
      die($connection->error);
    }
  }

  function edit_comment($id, $username, $content) { // 編輯留言
    global $connection;
    if($username) {
    $sql = 'UPDATE `selena_message_board_messages` SET content = ? WHERE id = ? AND username = ?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
    }
    if(!$username) {
    $sql = 'UPDATE `selena_message_board_messages` SET content = ? WHERE id = ?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('si', $content, $id);
    }
    $result = $stmt->execute();
    if(!$result) { // 正確的話會回傳 1
      die($connection->error);
    }
  }
?>

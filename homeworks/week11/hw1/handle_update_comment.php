<?php
  session_start();
  require_once('check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=0&id=' . $_POST['id']); // 0 未輸入留言內容
    die();
  }
  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $id = $_POST['id'];

  $role = get_role($username);


  if(has_permission($role, 'edit')) {
    edit_comment($id, null, $content);
  } else {
    edit_comment($id, $username, $content);
  }

  header('Location: index.php');
?>

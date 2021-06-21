<?php
  session_start();
  require_once('check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $role = get_role($username);


  if(has_permission($role, 'delete')) {
    delete_comment($id, null);
  } else {
    delete_comment($id, $username);
  }

  header('Location: index.php');
?>

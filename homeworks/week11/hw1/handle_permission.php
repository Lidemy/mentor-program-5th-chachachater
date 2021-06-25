<?php
  session_start();
  require_once('check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  if (empty($_POST['role'])) {
    header('Location: permission.php?errCode=6'); // 6 修改權限時，沒有選擇身分
    die();
  }
  if ($_POST['role'] === 'editor' && empty($_POST['permission-edit']) && empty($_POST['permission-delete'])) {
    header('Location: permission.php?errCode=7');  // 7 修改權限時，選擇的身分為 edit，編輯和刪除欄位為空
    die();
  }
  $role = $_POST['role']; 
  $username = $_POST['username']; 
  
  if ($role === 'admin') {
    handle_role($role, $username);
  } else if ($role === 'user') {
    handle_role($role, $username);
  } else if ($role === 'suspend') {
    handle_role($role, $username);
  } else {
    $edit = (bool)$_POST['permission-edit']; // permission-edit: 1 or 0
    $delete = (bool)$_POST['permission-delete']; // permission-delete: 1 or 0
    if($edit) {
      $role = 'editor_edit_only';
    }
    if($delete) {
      $role = 'editor_delete_only';
    }
    if($edit && $delete) {
      $role = 'editor';
    }
    handle_role($role, $username);
  }

  $err_code = $connection->errno;
  if($err_code) {
    echo '發生錯誤, 錯誤代碼是: ' . $err_code;
    die($connection->error);
  }
  
  header('Location: permission.php');
?>

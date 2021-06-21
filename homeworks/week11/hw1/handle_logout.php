<?php
  session_start();
  require_once('check_permission.php');
  require_once('connection.php');
  session_destroy();
  header('Location: index.php');
?>
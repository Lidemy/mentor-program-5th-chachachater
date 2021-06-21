<?php
  session_start();
  require_once('./check_permission.php');
  require_once('./connection.php');
  require_once('utils.php');

  $category = $_POST['category'];
  if(empty($category)){
    header('Location: ./add_category.php?errCode=1'); // 1 管理分類時，未輸入分類
    die($connection->error);
  }

  $stmt = $connection->prepare("INSERT INTO `selena_blog_categories` (category) VALUES (?)");
  $stmt->bind_param('s',
    $category
  );
  $result = $stmt->execute();
  if(!$result) {
    die($connection->error);
  }
  header('Location: ./admin_category.php');
?>

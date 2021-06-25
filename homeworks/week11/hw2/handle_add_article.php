<?php
  session_start();
  require_once('./check_permission.php');
  require_once('./connection.php');
  require_once('utils.php');

  $title = $_POST['title'];
  $content = $_POST['content'];
  $category_id = $_POST['category_id'];
  if(empty($title) || empty($content) || empty($category_id)){
    header('Location: ./add_article.php?errCode=0'); // 0 管理文章時，未輸入文章標題或內文或分類
    die($connection->error);
  }

  $stmt = $connection->prepare("INSERT INTO `selena_blog_articles` (title, content, category_id) VALUES (?, ?, ?)");
  $stmt->bind_param('ssi',
    $title,
    $content,
    $category_id
  );
  $result = $stmt->execute();
  if(!$result) {
    die($connection->error);
  }
  header('Location: ./index.php');
?>

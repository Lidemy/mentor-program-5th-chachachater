<?php
  session_start();
  require_once('./check_permission.php');
  require_once('./connection.php');
  $title = $_POST['title'];
  $id = $_POST['id'];
  $content = $_POST['content'];
  $category_id = $_POST['category_id'];

  if(empty($id) || empty($title) || empty($content) || empty($category_id)){
    header('Location: ./update_article.php?id=' . $id . '&errCode=0'); // 0 管理文章時，未輸入文章標題或內文或分類
    die($connection->error);
  }
  
  $sql =
    "UPDATE
      `selena_blog_articles`
    SET
      title = ?,
      content = ?,
      category_id = ?
    WHERE
      id = ?";
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ssii',
    $title,
    $content,
    $category_id,
    $id
  );
  $result = $stmt->execute();
  if(!$result) {
    die($connection->error);
  }
  header('Location: ./admin_article.php');
?>

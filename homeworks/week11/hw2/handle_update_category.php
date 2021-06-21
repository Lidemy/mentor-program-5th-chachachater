<?php
  session_start();
  require_once('./check_permission.php');
  require_once('./connection.php');
  $id = $_POST['id'];
  $category = $_POST['category'];
  if(empty($id) || empty($category)){
    header('Location: ./update_category.php?id=' . $id . '&errCode=1'); // 1 管理分類時，未輸入分類
    die($connection->error);
  }  

  $sql =
  "UPDATE
    `selena_blog_categories`
  SET
    category = ?
  WHERE
    id = ?";
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('si',
    $category,
    $id
  );
  $result = $stmt->execute();
  if(!$result) {
    die($connection->error);
  }
?>

<script>
  goBack(-2)
  function goBack(page) {
    window.history.go(page);
  }
</script>

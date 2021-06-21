<?php
  session_start();
  require_once('./check_permission.php');
  require_once('connection.php');

  $stmt = $connection->prepare(
    'UPDATE
      `selena_blog_categories`
    SET
      is_deleted = 1
    WHERE
      id = ?'
    );
  $stmt->bind_param('i', $_GET['id']);
  $result = $stmt->execute();
  if(!$result) {
    die('error' . $connection->error);
  }
?>

<script>
  goBack(-1)
  function goBack(page) {
    window.history.go(page);
  }
</script>

<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  $page = 1;
  if(isset($_GET['page'])) {
    $page = (int)$_GET['page'];
  }
  $items_per_page = 30;
  $offset = ($page - 1) * $items_per_page;

  $sql = 
  'SELECT
    id,
    title,
    content,
    created_at,
    category_id
  FROM
    `selena_blog_articles`
  WHERE
    is_deleted = 0
  ORDER BY
    id
  DESC
  LIMIT ? OFFSET ?';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die($connection->error);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./normalize.css" />
  <link rel="stylesheet" href="./stylesheet.css" />
  <title>Blog</title>
</head>
<body class="debug">
  <?php include_once('./nav.php'); ?>
  <div class="banner">
    <div>
      <h1>存放技術之地</h1>
      <p>Welcome to my blog</p>
    </div>
  </div>

  <div class="container">
    <div class="all-article-block">
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="title">
          <a href="./article.php?id=<?php echo $row['id'] ?>">
            <?php echo escape($row['title']); ?>
          </a>
        </div>
      <?php } ?>
    </div>
  </div>

    <div class="page-block">
      <?php 
        $stmt = $connection->prepare('SELECT COUNT(id) as count FROM `selena_blog_articles` WHERE is_deleted is false');
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page-total">總共<?php echo $count; ?>筆文章，現在在第<?php echo $page; ?>頁</div>
      <a href="./all_articles.php?page=1">首頁</a>

      <?php if($page !== 1) { ?>
        <a href="./all_articles.php?page=<?php echo $page - 1; ?>">上一頁</a>
      <?php } ?>
      <?php if($page != $total_page) { ?>
        <a href="./all_articles.php?page=<?php echo $page + 1; ?>">下一頁</a>
        <a href="./all_articles.php?page=<?php echo $total_page; ?>">最後一頁</a>
      <?php } ?>
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script> 


</body>
</html>

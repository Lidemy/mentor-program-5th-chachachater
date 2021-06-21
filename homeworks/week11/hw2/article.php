<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  $sql = 
  "SELECT
    A.id,
    A.title,
    A.content,
    A.created_at,
    C.category,
    C.is_deleted AS category_deleted
  FROM
    `selena_blog_articles` AS A
  LEFT JOIN `selena_blog_categories` AS C
  ON
    A.category_id = C.id
  WHERE
    A.id = ? AND A.is_deleted = 0"; // A.is_deleted = 0 確保不會有人透過改 url id 來取得已刪除的文章
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('i', $_GET['id']);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die($connection->error);
  }
  $row = $result->fetch_assoc();
  if (!$row) {
    die('此文章已刪除');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./normalize.css" />
  <link rel="stylesheet" href="./stylesheet.css" />
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
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

    <div class="article-block">
      <div class="article">
        <div class="article-title">
          <a href="./article.php?id=<?php echo $row['id'] ?>">
            <?php echo escape($row['title']);?>
          </a>
          <?php if($username) {?>
            <button>
              <a href="./update_article.php?id=<?php echo $row['id'] ?>">
                編輯
              </a>
            </button>
          <?php } ?>
        </div>

        <div class="article-content">
          <div class="info-block">
            <span class="material-icons-outlined md-16">
              watch_later
            </span>
            <?php echo $row['created_at'] ?>
            <span class="material-icons-outlined md-16">
              folder
            </span>
              <?php if(!$row['category_deleted']) { ?>
                <?php echo escape($row['category']); ?>
              <?php } ?>
          </div>
          <div class="detail-block">
            <?php echo escape($row['content']); ?>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script> 

</body>
</html>

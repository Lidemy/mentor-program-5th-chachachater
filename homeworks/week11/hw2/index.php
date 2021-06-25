<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  $page = 1;
  if(isset($_GET['page'])) {
    $page = (int)$_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;
  $sql = 
  'SELECT
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
    A.is_deleted = 0
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
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="article">
          <div class="article-title">
            <a href="./article.php?id=<?php echo $row['id'] ?>">
              <?php echo escape($row['title']); ?>
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
            <div class="detail-block text-hidden"><!--
              --><?php echo escape($row['content']); ?>
            </div>
            <div class="read-block"><a href="./article.php?id=<?php echo $row['id'] ?>">Read More</a></div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>
</body>
</html>

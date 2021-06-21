<?php
  session_start();
  require_once('./check_permission.php');
  require_once('./connection.php');
  require_once('utils.php');

  $stmt = $connection->prepare("SELECT * FROM `selena_blog_categories` ORDER BY created_at DESC");
  $stmt->execute();
  $result = $stmt->get_result();
  if(!$result) {
    die('error');
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
      <h1>存放技術之地 - 後台</h1>
      <p>Welcome to my blog</p>
    </div>
  </div>

  <div class="container">
    <div class="article-block">
      <div class="title-block">
        <h1>分類管理</h1>
        <a href="./add_category.php">新增分類</a>
        <a href="./admin_article.php">文章管理</a>
      </div>
      <?php while($row = mysqli_fetch_assoc($result)) { ?>
        <div class="article admin-block">
          <div class="article-title">
              <?php echo escape($row['category']); ?>
            <div class="admin-detail">
              <div class="created-date">
                <?php echo $row['created_at'] ?>
              </div>
              <button>
                <a href="./update_category.php?id=<?php echo $row['id']; ?>">
                  編輯
                </a>
              </button>
            <?php if(!$row['is_deleted']) { ?>
              <button>
                <a href="./handle_delete_category.php?id=<?php echo $row['id']; ?>">
                  刪除
                </a>
              </button>
            <?php } ?>
            <?php if($row['is_deleted']) { ?>
              <button>
                <a href="./handle_recovery_category.php?id=<?php echo $row['id']; ?>">
                  復原
                </a>
              </button>
            <?php } ?>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>

</body>
</html>

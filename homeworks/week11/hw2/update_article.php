<?php
  session_start();
  require_once('./check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  $errcode = null;
  if(isset($_GET['errCode'])) {
    $errcode = (int)$_GET['errCode'];
  }

  $stmt = $connection->prepare("SELECT * FROM `selena_blog_articles` WHERE id=?");
  $stmt->bind_param('i',
    $_GET['id']
  );
  $stmt->execute();
  $result = $stmt->get_result();
  if(!$result) {
    die($connection->error);
  }
  $row = $result->fetch_assoc();

  $sql_category = sprintf("SELECT * FROM `selena_blog_categories` WHERE is_deleted = 0");
  $result_category = $connection->query($sql_category);
  if(!$result_category) {
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
      <h1>存放技術之地 - 後台</h1>
      <p>Welcome to my blog</p>
    </div>
  </div>

  <div class="container">
    <form class="article-content" action="handle_update_article.php" method="POST">
      <h1>編輯文章：</h1>
      <input type="text" id="title" name="title" value="<?php echo escape($row['title']); ?>">
      <input type="text"  name="id" value="<?php echo $row['id']; ?>" style="display: none;">
      <select class="category" name="category_id">
        <option value="">請選擇文章分類</option>
          <?php while ($row_category = $result_category->fetch_assoc()) { 
            $category_id = $row_category['id'];  
            $category = $row_category['category'];  
          ?>
            <option
              value=
              <?php echo $category_id;?>
              <?php if($category_id == $row['category_id']) { ?>
                selected="selected"
              <?php } ?>
            >
            <?php echo escape($category); ?>
          </option>
          <?php } ?>
      <select>
      <textarea rows="5" cols="75" id="content" name="content"><?php echo escape($row['content']); ?></textarea>
      <?php if($errcode === 0) { ?><p id="error-block">未輸入完整的標題/內文/分類</p><?php } ?>
      <input type="submit" value="送出文章">
    </form>
  </div>


  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>
</body>
</html>

<?php
  session_start();
  require_once('./check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  $errcode = null;
  if(isset($_GET['errCode'])) {
    $errcode = (int)$_GET['errCode'];
  }

  $stmt = $connection->prepare("SELECT * FROM `selena_blog_categories` WHERE is_deleted = 0");
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
    <form class="article-content" action="handle_add_article.php" method="POST">
      <h1>發表文章：</h1>
      <input type="text" name="title" placeholder="輸入文章名稱">
      <select class="category" name="category_id">
        <option>請選擇文章分類</option>
          <?php while ($row = mysqli_fetch_assoc($result)) { 
            $category_id = $row['id'];  
            $category = $row['category'];  
          ?>
            <option value="<?php echo $category_id;?>"><?php echo escape($category); ?></option>
          <?php } ?>
      <select>
      <textarea rows="5" cols="75" name="content" placeholder="輸入文章內容"></textarea>
      <?php if($errcode === 0) { ?><p id="error-block">未輸入完整的標題/內文/分類</p><?php } ?>
      <input type="submit" value="送出文章">
    </form>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script>

</body>
</html>

<?php
  session_start();
  require_once('./check_permission.php');
  require_once('connection.php');
  require_once('utils.php');

  $errcode = null;
  if(isset($_GET['errCode'])) {
    $errcode = (int)$_GET['errCode'];
  }

  $stmt = $connection->prepare("SELECT * FROM `selena_blog_categories` WHERE id=?");
  $stmt->bind_param('i',
    $_GET['id']
  );
  $stmt->execute();
  $result = $stmt->get_result();
  if(!$result) {
    die($connection->error);
  }
  $row = $result->fetch_assoc();
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
    <form class="article-content" action="handle_update_category.php" method="POST">
      <h1>編輯分類：</h1>
      <input type="text" name="category" value="<?php echo escape($row['category']); ?>">
      <input type="text"  name="id" value="<?php echo $row['id']; ?>" style="display: none;">
      <?php if($errcode === 1) { ?><p id="error-block">未輸入分類</p><?php } ?>
      <input type="submit" value="送出分類">
    </form>
  </div>


  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="./javaScript.js"></script> 

</body>
</html>

<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $id = $_GET['id'];
  $stmt = $connection->prepare(
    'SELECT * FROM `selena_message_board_messages` WHERE id = ?'
  );
  $stmt->bind_param('d', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($connection->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $username = null; // 確認登入狀態
  if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  $invalid_content = null; // 確認有沒有輸入留言內容
  if(isset($_GET['invalid_content'])) {
    $invalid_content = $_GET['invalid_content'];
  }
  $errCode = null;
  if(isset($_GET['errCode'])) {
    $errCode = (int)$_GET['errCode'];
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./normalize.css" />
  <link rel="stylesheet" href="./stylesheet.css" />
  <title>Message-Board</title>
</head>
<body>
  <div class="warning">
    <p>警告!本網站為練習用，註冊時請勿使用任何真實的帳號或密碼。</p>
  </div>

  <div class="container">
    <div class="user-block">
      <div class="input-block">
        <form action="handle_update_comment.php" method="POST">
          <label for="content">編輯留言</label>
          <textarea rows="5" cols="75" id="content" name="content"><?php echo escape($row['content']); ?></textarea>
          <input class="hide" name="id" value="<?php echo $row['id']; ?>">
          <input type="submit" value="提交">
          <?php if($errCode === 0) { ?>
            <p class="invalid">請不要輸入空的留言內容</p>
          <?php } ?>
        </form>
      </div>
      <button class="index-btn"><a href="index.php">首頁</a></button>
    </div>
  </div>

  <script>
  </script>
</body>
</html>

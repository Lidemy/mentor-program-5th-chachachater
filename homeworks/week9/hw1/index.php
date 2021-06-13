<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  $stmt = $connection->prepare(
    'select M.id as id, M.username as username, M.content as content,
     M.content_create_date as content_create_date 
    from `selena_message_board_messages` as M
    order by id desc'
  );
  $result = $stmt->execute();
  if (!$result) {
    die($connection->error);
  }
  $result = $stmt->get_result();

  $username = null; // 確認登入狀態
  if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
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
    <div class="user">
      <div class="avatar"></div>
      <?php if($username) {?>
        <h1>Hello, <?php echo escape($username); ?></h1>
        <button class="edit">編輯暱稱</button>
          <?php if($errCode === 1) {?>
            <p class="invalid">請輸入暱稱</p>
          <?php } ?>
        <div class="nickname hide">
          <form action="./handle_update_user.php" method="POST">
            <input type="text" id="nickname" name="nickname" placeholder="請輸入暱稱"/>
            <input type="submit" value="提交" />
          </form>
        </div>
      <?php } ?>
      <div class="comment">
        <form action="handle_add_comment.php" method="POST">
          <label for="content">messages</label>
          <textarea rows="5" cols="75" id="content" name="content" placeholder="請輸入留言內容"></textarea>
          <?php if($username) {?>
          <input type="submit" value="提交">
          <?php } else { ?>
            <p class="invalid">請登入或註冊後再留言</p>
          <?php } ?>
          <?php if($errCode === 0) { ?>
            <p class="invalid">請輸入留言內容再提交</p>
          <?php } ?>
        </form>
      </div>
        <button class="sign"><a href="register.php">註冊</a></button>
        <?php if(!$username) { 
        echo '<button class="login"><a href="login.php">登入</a></button>';
        } ?>
        <?php if($username) { 
        echo '<button class="logout"><a href="handle_logout.php">登出</a></button>';
        } ?>
    </div>

    <div class="comment-list">
      <p class="comment-title">
        Recent messages
      </p>

      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="singe-comment">
          <div class="avatar"></div>
          <div class="description">
            <p class="username">
              <a href="#">
                <?php echo $row['username']; ?>
              </a>
              <?php echo $row['content_create_date']; ?>
            </p>
            <p class="content"><!--
              --><?php echo escape($row['content']); ?>
            </p>
          </div>
        </div>
      <?php } ?>

      <div class="list-end">More pages</div>
    </div>
  </div>

  <button class="topBtn hide" title="Go to top">Top</button>

  <script>
    const editBtn = document.querySelector('.edit')
    const topBtn = document.querySelector('.topBtn')
    if(editBtn) {
      editBtn.addEventListener('click', (event) => {
        document.querySelector('.nickname').classList.toggle('hide')
      })}
    topBtn.addEventListener('click', goBackTop)
    window.addEventListener('scroll', showBtn)

    function goBackTop() {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }
    function showBtn(e) {
      if(document.body.scrollTop > 360 || document.documentElement.scrollTop > 360) {
        topBtn.classList.remove('hide')
      } else {
        topBtn.classList.add('hide')
      }}
  </script>
</body>
</html>

<?php
  session_start();
  require_once('connection.php');
  require_once('utils.php');

  $page = 1;
  if(isset($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;
  $stmt = $connection->prepare(
    'SELECT
    M.id,
    M.username,
    M.content,
    M.content_create_date,
    U.role,
    U.nickname
    FROM
        `selena_message_board_messages` AS M
    LEFT JOIN `selena_message_board_users` AS U
    ON
        M.username = U.username
    WHERE
        M.is_deleted IS NULL 
    ORDER BY
        id
    DESC
    LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die($connection->error);
  }
  $result = $stmt->get_result();

  $my_username = null; // 確認登入狀態
  $role = null;
  if(isset($_SESSION['username'])) {
    $my_username = $_SESSION['username'];
    $stmt_role = $connection->prepare( // 取得暱稱
      'SELECT
        nickname,
        role
      FROM
        `selena_message_board_users`
      WHERE
        username = ?'
    );
    $stmt_role->bind_param('s', $my_username);
    $result_role = $stmt_role->execute();
    if(!$result_role) {
      die($connection->error);
    }
    $result_role = $stmt_role->get_result();
    $row_role = $result_role->fetch_assoc();
    $role = $row_role['role'];
    $my_nickname = $row_role['nickname'];
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
      <div class="avatar"></div>
      <?php if($my_username) {?>
        <h1>Hello, <?php echo escape($my_nickname); ?>(@<?php echo escape($my_username)?>)</h1>
        <?php if(has_permission($role, 'add')) { ?>
          <button class="edit-btn">編輯暱稱</button>
            <?php if($errCode === 1) {?>
              <p class="invalid">請輸入暱稱</p>
            <?php } ?>
          <div class="nickname-block hide">
            <form action="./handle_update_user.php" method="POST">
              <input type="text" id="nickname" name="nickname" placeholder="請輸入暱稱"/>
              <input type="submit" value="提交" />
            </form>
          </div>
        <?php } ?>
      <?php } ?>
      <div class="input-block">
        <form action="handle_add_comment.php" method="POST">
          <label for="content">messages</label>
          <textarea rows="5" cols="75" id="content" name="content" placeholder="請輸入留言內容"></textarea>
          <?php if(has_permission($role, 'add')) {?>
          <input type="submit" value="提交">
          <?php } else { 
                    if($my_username) { ?>
                      <p class="invalid">目前身分為: <?php echo $role;?>，無法新增留言</p>
                    <?php } else { ?>
                      <p class="invalid">請登入或註冊後再留言</p>
                    <?php } ?>
          <?php } ?>
          <?php if($errCode === 0) { ?>
            <p class="invalid">請輸入留言內容再提交</p>
          <?php } ?>
        </form>
      </div>
        <button class="sign-btn"><a href="register.php">註冊</a></button>
        <?php if(!$my_username) { ?>
          <button class="login-btn"><a href="login.php">登入</a></button>
        <?php } ?>
        <?php if($my_username) { ?>
          <button class="logout-btn"><a href="handle_logout.php">登出</a></button>
        <?php } ?>
        <?php if($my_username && ($role === 'admin')) { ?>
          <button class="manage-btn"><a href="permission.php">後台</a></button>
        <?php } ?> 
    </div>

    <div class="title-block">
      <h1 class="title">Recent messages</h1>

      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="comment-block">
          <div class="avatar"></div>
          <div class="description">
            <p class="username">
              <a href="#">
                <?php echo escape($row['nickname']); ?>(@<?php echo escape($row['username']); ?>)
              </a>
              <?php echo $row['content_create_date']; ?>
              <?php if($row['username'] === $my_username) { ?>
                <a href="./update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
                <a href="./handle_delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
              <?php } else { ?>
                  <?php if(has_permission($role, 'edit')) { ?>
                    <a href="./update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
                  <?php } ?>
                  <?php if(has_permission($role, 'delete')) { ?>
                    <a href="./handle_delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
                  <?php } ?>
              <?php } ?>

            </p>
            <p class="content"><!--
              --><?php echo escape($row['content']); ?>
            </p>
          </div>
        </div>
      <?php } ?>

      <div class="page-block">
        <?php 
          $stmt = $connection->prepare(
            'SELECT COUNT(id) as count FROM `selena_message_board_messages` WHERE is_deleted is NULL'
          );
          $result = $stmt->execute();
          $result = $stmt->get_result();
          $row = $result->fetch_assoc();
          $count = $row['count'];
          $total_page = ceil($count / $items_per_page);
        ?>
        
        <div class="page-total">總共<?php echo $count; ?>筆留言，現在在第<?php echo $page; ?>頁</div>
        <a href="./index.php?page=1">首頁</a>
        <?php if($page != 1) { ?>
        <a href="./index.php?page=<?php echo $page - 1;?>">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page) { ?>
        <a href="./index.php?page=<?php echo $page + 1;?>">下一頁</a>
        <a href="./index.php?page=<?php echo $total_page; ?>">最後一頁</a>
        <?php } ?>
      </div>
    </div>
  </div>

  <button class="topBtn hide" title="Go to top">Top</button>

  <script>
    const editBtn = document.querySelector('.edit-btn')
    const topBtn = document.querySelector('.topBtn')
    if(editBtn) {
      editBtn.addEventListener('click', (event) => {
        document.querySelector('.nickname-block').classList.toggle('hide')
      })}
    topBtn.addEventListener('click', goBackTop)
    window.addEventListener('scroll', showBtn)

    function goBackTop() {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
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

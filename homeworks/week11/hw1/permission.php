<?php
  session_start();
  require_once('check_permission.php');
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
      U.id AS id,
      U.username AS username,
      U.role AS role,
      R.edit_admin AS edit_admin,
      R.delete_admin AS delete_admin
    FROM
        `selena_message_board_users` AS U
    LEFT JOIN `selena_message_board_roles` AS R
    ON
        U.role = R.role
    ORDER BY
        username
    ASC
    LIMIT ? OFFSET ?'
    );
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die($connection->error);
  }
  $result = $stmt->get_result();

  $username = null; // 確認登入狀態
  if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
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
      <?php if($username) {?>
        <h1>Hello, <?php echo escape($username); ?></h1>
      <?php } ?>
        <button class="sign-btn"><a href="register.php">註冊</a></button>
        <button class="login-btn"><a href="login.php">登入</a></button>
        <button class="logout-btn"><a href="handle_logout.php">登出</a></button>
        <button class="index-btn"><a href="index.php">首頁</a></button>
    </div>

    <div class="title-block">
      <h1 class="title">管理後台</h1>

      <div class="role-block">
        <div>A→Z</div>
        <div class="role-details">
          <div>role</div>
          <div>編輯留言</div>
          <div>刪除留言</div>
          <div></div>
        </div>
    </div>

    <?php while($row = $result->fetch_assoc()) {
      $username = $row['username'];
      $role = $row['role'];
      $bool_editor = false;
      if($role === 'editor' || $role === 'editor_edit_only' || $role === 'editor_delete_only') {
        $bool_editor = true;
        } ?>

      <div class="permission-block">
        <p class="username"><?php echo $username; ?></p>
        <form class="permission-form" action="handle_permission.php" method="POST">
          <input class="hide" name="username" value="<?php echo $username; ?>">
          <select name="role">
            <option value="admin" <?php if($role === 'admin') {echo 'selected="selected"';}?>>admin</option>
            <option value="user" <?php if($role === 'user') {echo 'selected="selected"';}?>>user</option>
            <option value="suspend" <?php if($role === 'suspend') {echo 'selected="selected"';}?>>suspend</option>
            <option value="editor" <?php if($role === 'editor' || $role === 'editor_edit_only' || $role === 'editor_delete_only' ) {echo 'selected="selected"';}?>>editor</option>
          </select>

          <label class=<?php if(!check_editor($role)) {echo 'invisible';}?>>
            <div>可</div>
            <input type="radio" name="permission-edit" value='1'
              <?php if($row['edit_admin']) {echo 'checked';} ?>
            >
          </label>
          <label class=<?php if(!check_editor($role)) {echo 'invisible';}?>>
            <div>否</div>
            <input type="radio" name="permission-edit" value='0'
              <?php if(!$row['edit_admin']) {echo 'checked';} ?>
            >
          </label>
          <label class=<?php if(!check_editor($role)) {echo 'invisible';} ?>>
            <div>可</div>
            <input type="radio" name="permission-delete" value='1'
              <?php if($row['delete_admin']) {echo 'checked';} ?>
            >
          </label>
          <label class=<?php if(!check_editor($role)) {echo 'invisible';} ?>>
            <div>否</div>
            <input type="radio" name="permission-delete" value='0'
              <?php if(!$row['delete_admin']) {echo 'checked';} ?>
            >
          </label>
          <input type="submit" value="save">
        </form>
      </div>
    <?php } ?>


    <div class="page-block">
      <?php 
        $stmt = $connection->prepare('SELECT COUNT(id) as count FROM `selena_message_board_users`');
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page-total">總共<?php echo ceil($count/10); ?>頁，現在在第<?php echo $page; ?>頁</div>
      <a href="./permission.php?page=1">首頁</a>
      <?php if($page != 1) { ?>
        <a href="./permission.php?page=<?php echo $page - 1;?>">上一頁</a>
      <?php } ?>
      <?php if($page != $total_page) { ?>
        <a href="./permission.php?page=<?php echo $page + 1;?>">下一頁</a>
        <a href="./permission.php?page=<?php echo $total_page; ?>">最後一頁</a>
      <?php } ?>
    </div>
  </div>

  <button class="topBtn hide" title="Go to top">Top</button>

  <script>
    const topBtn = document.querySelector('.topBtn')
    const div = document.querySelector('.container')
    const invisibleForm = document.querySelectorAll('form .invisible')

    topBtn.addEventListener('click', goBackTop)
    window.addEventListener('scroll', showBtn)

    div.addEventListener('click', (e) => {
      if(e.target.tagName === 'SELECT') {
        if(e.target.value === 'editor') {
          const invisible = e.target.parentElement.querySelectorAll('.invisible')
          invisible.forEach((each) => {each.classList.remove('invisible')})
        } else {
          const label = e.target.parentElement.querySelectorAll('label')
          label.forEach((each) => {each.classList.add('invisible')})
        }
      }
    })

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

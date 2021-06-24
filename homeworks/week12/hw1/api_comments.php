<?php
  require_once('connection.php');
  require_once('utils.php');
  header('Access-Control-Allow-Origin: *');
  header('Content-type:application/json;charset=utf-8');

  $site_key = null;
  if(isset($_GET['site_key'])) {
    $site_key = $_GET['site_key'];
  }
  $limit = 5; // 預設每次載入都會顯示 5 筆留言
  if(isset($_GET['limit'])) {
    $limit = $_GET['limit'];
  }
  $limit_for_pagination = $limit + 1; // 比 limit 多找一筆資料，用來確認 pagination 是否結束

  $cursor_before = null; // 用最後一筆資料的 id 作為 cursor 的定位
  if(isset($_GET['cursor_before'])) {
    $cursor_before = $_GET['cursor_before'];
  }
  $discussions = array();
  $cursor_before ? $result = query($site_key, $cursor_before, $limit_for_pagination) : $result = query($site_key, null, $limit_for_pagination);

  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      'id' => escape($row['id']), 
      'content' => escape($row['content']), 
      'nickname' => escape($row['nickname']), 
      'created_at' => escape($row['created_at']))
    );
  }

  $count = count($discussions);
  if($count === $limit_for_pagination) array_pop($discussions);

  $response = array(
    'success' => true,
    'discussions' => $discussions,
    'cursor_before' => end($discussions)['id'],  // 用最後一筆資料的 id 作為 cursor 的定位
    'pagination_end' => ($count === $limit_for_pagination) ? false : true
  );
  $response = json_encode($response);
  print_r($response);
?>
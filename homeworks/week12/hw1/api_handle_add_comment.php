<?php
  require_once('connection.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $response = array();

  if (!isset($_POST['site_key']) || !isset($_POST['content']) || !isset($_POST['nickname'])) die();
  if ($_POST['site_key'] === '' || $_POST['content'] === '' || $_POST['nickname'] === '') die(); // isset() 對空字串會判斷為 true

  $nickname = strval($_POST['nickname']); // table 存放的型態為 text
  $content = strval($_POST['content']);
  $site_key = strval($_POST['site_key']);
  $sql = 'INSERT INTO `selena_message_discussions`(site_key, content, nickname) values (?, ?, ?)';
  $stmt = $connection->prepare($sql);
  $stmt->bind_param('sss', $site_key, $content, $nickname);
  $result = $stmt->execute();
  if(!$result) {  // 正確的話會回傳 1
    $response['success'] = false;
    $response['message'] = $connection->error;
    print_r(json_encode($response));
    die();
  }

  $response['success'] = true;
  $response['message'] = $_POST['content'];
  print_r(json_encode($response));
?>

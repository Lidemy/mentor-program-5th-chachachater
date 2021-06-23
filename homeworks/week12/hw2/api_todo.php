<?php
  require_once('connection.php');
  require_once('utils.php');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Origin: *');
  header('Content-type: application/json;charset=utf-8');

  if(empty($_GET['token'])) {
    api_sucess_response(false);
    die();
  }
  $token = $_GET['token'];
  $stmt = $connection->prepare(
    "SELECT
        content
      FROM
        `selena_todo`
      WHERE
        token = ?
    "
  );
  $stmt->bind_param('s', $token);
  $result = $stmt->execute();
  if(!$result) die($connection->error);
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  print_r($row['content']);
?>
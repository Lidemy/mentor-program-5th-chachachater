<?php
  require_once('connection.php');
  require_once('utils.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Content-Type');

  $input = json_decode(file_get_contents('php://input'), true);
  if (!isset($input['token']) || !isset($input['todo'])) {
    api_sucess_response(false);
    die();
  }

  $token = $input['token'];
  $todo_array = $input['todo'];
  if(!check_token($token)) {
    insertDate($token, json_encode($todo_array));
    api_sucess_response(true);
  } else {
    updateData($token, json_encode($todo_array));
    api_sucess_response(true);
  }
?>

<?php
  require_once('connection.php');

  function check_token ($token) {
    global $connection;
    $stmt = $connection->prepare(
      'SELECT
        `token`
        FROM
          `selena_todo`
        WHERE
          `token` = ?
      ');
    $stmt->bind_param('s', $token);
    $result = $stmt->execute();
    if(!$result) { // 正確的話會回傳 1
      die($connection->error);
    }
    $result = $stmt->get_result();
    return $result->num_rows;
  }

  function insertDate($token, $todo_array) {
    global $connection;

    $stmt = $connection->prepare(
      'INSERT INTO `selena_todo`(`token`, `content`)
        VALUES(?, ?)
      ');
    $stmt->bind_param('ss', $token, $todo_array);
    $result = $stmt->execute();
    if(!$result) {
      die($connection->error);
    }
  }

  function updateData($token, $todo_array) {
    global $connection;

    $stmt = $connection->prepare(
      'UPDATE
        `selena_todo`
      SET
        `content` = ?
      WHERE
        token = ?
      ');
    $stmt->bind_param('ss', $todo_array, $token);
    $result = $stmt->execute();
    if(!$result) {
      die($connection->error);
    }
  }

  function api_sucess_response($boolval) {
    $response = array();
    if($boolval) {
      $response['success'] = true;
      $response['message'] = 'Saved successfully';
      print_r(json_encode($response));
    }
    if(!$boolval) {
      $response['success'] = false;
      $response['message'] = 'Please input token';
      print_r(json_encode($response));
    }
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>

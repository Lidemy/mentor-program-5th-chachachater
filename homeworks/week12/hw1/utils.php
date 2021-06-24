<?php
  require_once('connection.php');

  function query($site_key, $cursor_before, $limit) {
    global $connection;

    $sql = 
    "SELECT
        D.id,
        D.nickname,
        D.content,
        D.created_at
      FROM
        `selena_message_discussions` AS D
      WHERE
        site_key = ? " . 
        (empty($cursor_before) ? "" : "AND id < ? ") . 
      "ORDER BY
        id
      DESC
      LIMIT ?";

    $stmt = $connection->prepare($sql);
    if($cursor_before) {
      $stmt->bind_param('sii', $site_key, $cursor_before, $limit);
    } else {
      $stmt->bind_param('si', $site_key, $limit);
    }
    $result = $stmt->execute();
    if (!$result) {
      die($connection->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>

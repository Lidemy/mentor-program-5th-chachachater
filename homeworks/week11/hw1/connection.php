<?php
  $connection = new mysqli('localhost', 'mtr04group3' , 'Lidemymtr04group3' , 'mtr04group3');

  if($connection->connect_error) {
    die($connection->connect_error);
  }
  $connection->query('SET NAMES UTF8');
  $connection->query('SET time_zone = "+8:00"');
?>

<?php
class SQLiteDB extends SQLite3
{
  function __construct()
  {
     $this->open('information.sqlite');
  }
}

$db = new SQLiteDB();
if(!$db){
  echo $db->lastErrorMsg();
}

$ret = $db->query('SELECT * FROM peoplesInfo');
$uniqueNumber = 'notUsed';
while ($row = $ret->fetchArray()) {
  if($_GET['q'] == $row['MOBILE']){
    $uniqueNumber = 'used';
  }
}
echo $uniqueNumber;
?>
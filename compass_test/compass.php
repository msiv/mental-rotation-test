<?php

$connect = mysql_connect("localhost", "merot_tester", "ZV3CEnXJ");
mysql_set_charset('utf8',$connect);
mysql_select_db("merot_tests");

$s1 = "SELECT name FROM specialty;";
$result = mysql_query($s1);
while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $specialtyArr = $specialtyArr."<option value='".$line["name"]."'>";
}

mysql_free_result($result);
mysql_close($connect);
include "compass.html";
?>
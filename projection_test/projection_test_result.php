<?php
$connect = mysql_connect("localhost", "merot_tester", "ZV3CEnXJ");
mysql_set_charset('utf8',$connect);
mysql_select_db("merot_tests");

$result = mysql_query("SELECT id FROM specialty WHERE name = '" . mysql_real_escape_string($_POST["specialty"])."'");
$specialty_id = mysql_fetch_array($result, MYSQL_ASSOC);
$specialty_id = $specialty_id["id"];

if($specialty_id == 0){
	$result = mysql_query("INSERT INTO specialty SET name = '".mysql_real_escape_string($_POST["specialty"])."'");
	$specialty_id = mysql_insert_id();
}

$result = mysql_query("SELECT id FROM students WHERE name = '" . mysql_real_escape_string($_POST["name"])."'AND surname = '". mysql_real_escape_string($_POST["surname"])."'AND group_number = '". mysql_real_escape_string($_POST["group_number"])."'AND specialty_id = ". $specialty_id);
$student_id = mysql_fetch_array($result, MYSQL_ASSOC);
$student_id = $student_id["id"];

if($student_id == 0){
	$result = mysql_query("INSERT INTO students SET name = '" . mysql_real_escape_string($_POST["name"])."', surname = '". mysql_real_escape_string($_POST["surname"])."', group_number = '". mysql_real_escape_string($_POST["group_number"])."', specialty_id = ". $specialty_id);
	$student_id = mysql_insert_id();
}

$s1 = "INSERT INTO projection_test SET number_correct =" . intval($_POST["number_correc"]) . ", number_task= " . intval($_POST["number_task"]) . ", average_time= " . floatval($_POST["average_time"]) . ", id_student='" . $student_id . "'" . ", array_result='" . mysql_real_escape_string($_POST["array_result"]) . "'" . ", mode= " . intval($_POST["mode"]);
$result = mysql_query($s1);

$s1 = "SELECT id FROM projection_test WHERE id_student='" . $student_id ."'";
$result = mysql_query($s1);
$student_id = mysql_fetch_array($result, MYSQL_ASSOC);
$student_id = $student_id["id"];
echo $student_id;

//mysql_free_result($result);
mysql_close($connect);
?>
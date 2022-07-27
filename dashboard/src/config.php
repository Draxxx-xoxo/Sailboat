<?php
// Connecting, selecting database
$dbconn = pg_connect("host=localhost dbname=walle_testing user=jovan_wee password=b747400s port=5432")
    or die('Could not connect: ' . pg_last_error());

// Performing SQL query
$query = 'SELECT * FROM guild.configuration';
$result = pg_query($dbconn, $query) or die('Query failed: ' . pg_last_error());

// Printing results in HTML
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

$arr = pg_fetch_array($result, 0, PGSQL_NUM);

echo $arr[3];

// Free resultset
pg_free_result($result);

// Closing connection
pg_close($dbconn);
?>
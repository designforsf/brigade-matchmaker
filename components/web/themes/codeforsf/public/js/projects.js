$(document).ready(function () {

	var table = $("<table></table>")
	var row = $("<tr><td>Project Team Name</td><td>Mission Statement</td><td>Project Needs</td></tr>")
	table.append(row)
  for (var i = 1; i < 6; i++) {
		row = $("<tr></tr>")
		row.append("<td>Team " + i + "</td><td>Mission " + i + "</td><td> Needs " + i + "</td>")
		table.append(row)
	}
  $("#projects").append(table)
});
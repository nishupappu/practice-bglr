function submitFunction(){
	var x=document.forms["issueInputForms"]["issueDescInput"];
	var y=document.forms["issueInputForms"]["issueSeverityInput"];
	var z=document.forms["issueInputForms"]["issueAssignedToInput"];
	if(x.value == null || x.value == "" || y.value == null || y.value == "" || z.value == null || z.value == ""){
		alert("fields are empty,Please enter values");
	}
	
	
}
document.getElementById('issueInputForm').addEventListener('submit',saveIssue);
function saveIssue(e){
	
	
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var isssueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = (new Date).getTime();
	var issueStatus = 'Open';

	//issue object creation
	var issue = {
		id : issueId,
		description: issueDesc,
		severity : issueSeverity,
		status : issueStatus,
		assignedTo : isssueAssignedTo
	}

	if(localStorage.getItem('issues') == null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues',JSON.stringify(issues));
	}
	else{
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues',JSON.stringify(issues));
	}
	document.getElementById('issueInputForm').reset();
	fetchIssues();
	e.preventDefault();
}
function setStatusClosed(id,event){
	console.log('test close');
	var issues=JSON.parse(localStorage.getItem('issues'));
	for(var i=0;i<issues.length;i++){
		if(issues[i].id == id){
			issues[i].status = "Closed";

		}
	}
	localStorage.setItem('issues',JSON.stringify(issues));
	fetchIssues();
	event.preventDefault();
}
function deleteIssue(id,event){
	console.log('test delete');
	var issues=JSON.parse(localStorage.getItem('issues'));
	for(var i=0;i<issues.length;i++){
		if(issues[i].id == id){
			issues.splice(i,1);

		}
	}
	localStorage.setItem('issues',JSON.stringify(issues));
	fetchIssues();
	event.preventDefault();
}
function fetchIssues(){
	var issues=JSON.parse(localStorage.getItem('issues'));
	
	if(localStorage.getItem('issues') != null){
		var issuesList = document.getElementById('issuesList');
		issuesList.innerHTML= '';
		for(var i=0;i<issues.length;i++){
			var id=issues[i].id;
			var desc = issues[i].description;
			var severity = issues[i].severity;
			var assignedTo = issues[i].assignedTo;
			var status = issues[i].status;
			issuesList.innerHTML += '<div class="well">'+
									'<h6>Issue ID: ' +id+ '</h6>' +
									'<p><span class="label label-info">' + status + '</span></p>' + 
									'<h3>' + desc + '</h3>' +
									'<p><span class="glyphicon glyphicon-time"</span>' + severity + '</p>' +
									'<p><span class="glyphicon glyphicon-user"</span>' +assignedTo+ '</p>' +
									'<a href="#" onclick="setStatusClosed(\''+id+'\',event)" class="btn btn-warning"> Close </a>' + 
									'<a href="#" onclick="deleteIssue(\''+id+'\',event)" class="btn btn-danger"> Delete </a>' +
									'</div>';

			document.getElementById('issueCount').innerHTML=issues.length;
		}

	}

}
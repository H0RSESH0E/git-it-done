var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");


var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
}

var displayIssues = function(issues) {
    console.log(issues);
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues.";
    }
    for (var i =0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span")
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issueEl);
    }

}

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl).then(function(res) {

        if (res.ok) {
            res.json().then(function (data) {
                displayIssues(data);

                // check for paginated issues
                if (res.headers.get("link")) {
                    displayWarning(repo);
                }
            })
        }
        else {
            alert("There was a problem with your request.");
        }
    })
    .catch(function(error){
        console.log("Unable to connect to GitHub.");
    })
}

getRepoIssues("facebook/react")
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var displayRepos = function (repos, searchTerm) {

    console.log(repos);
    console.log(searchTerm);
    
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    for (var i = 0; i < repos.length; i++) {

        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = repos[i].open_issues_count + " issue(s) <i class='fas fa-times status-icon icon-danger'></i>";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);

    }

}

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username.")
    }

}

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a get request to url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
            displayRepos(data, user);
        });
        } 
        else {
            alert("Error: GitHub User Not Found.")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub.");
    })
};

userFormEl.addEventListener("submit", formSubmitHandler);
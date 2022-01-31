var x;
var y;
var z;
console.log("one");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = `https://api.github.com/users/${user}/repos`;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
    });
    });
};
console.log("three");

getUserRepos("H0RSESH0E");

console.log("four");

// getUserRepos();
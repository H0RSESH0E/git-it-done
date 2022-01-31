var x;
var y;
var z;


var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(rrr) {rrr.json().then(function(data) {console.log(data);});
    });
};


fetch("https://api.github.com/users/octocat/repos").then(object => object.json());

console.log()

// getUserRepos();
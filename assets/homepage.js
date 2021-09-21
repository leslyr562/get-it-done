var getUsersRepos = function (user) {
    var apiURL = "https://api.github.com/users/" + userfgi + "/repos";

  fetch(apiURL).then(function(response) {
    response.json().then(function(data){
        console.log(data);
    });
});
};

getUsersRepos();
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector ("#repos-container");
var repoSerachTerm = document.querySelector("#repo-search-term");


var getUsersRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUsersRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please eneter a GitHub username");
  }
};

var displayRepos = function(repos, searchTerm) {

// check if api returned any repos
if(repos.lenght === 0){
  repoContainerEl.textContent = "No repositories found.";
  return;
}


  // clear old content
repoContainerEl.textContent = "";
repoSerachTerm.textContent = searchTerm;

// loop over repos
for (var i = 0; i < repos.length; i++) {
  // format repo name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

  // create a container for each repo
  var repoEl = document.createElement("div");
  repoEl.classList = "list-item flex-row justify-space-between align-center";

  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = repoName;

  // append to container
  repoEl.appendChild(titleEl);

// create a status element
var statusEl = document.createElement("span");
statusEl.classlist = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0){
  statusEl.innerHtml =
  "<i class='fas fa-times status icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}
// append to container
repoEl.appendChild(statusEl);

  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}



  console.log(repos);
  console.log(searchTerm);

};

userFormEl.addEventListener("submit", formSubmitHandler);
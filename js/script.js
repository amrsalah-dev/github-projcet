let userFormEl = document.querySelector("#user-form");
let userInputEl = document.querySelector("#username");
let searchTermEl = document.querySelector("#search-term");
let reposEl = document.querySelector("#repos");

userFormEl.addEventListener("submit", formSubmitHandler);

function getLangRepos(lng) {
  let apiUrl = "https://api.github.com/search/repositories?q=" + lng;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayRepos(data.items, lng))
    .catch((err) => alert("Something went wrong!" + err.message));
}

function formSubmitHandler(e) {
  e.preventDefault();
  let user = userInputEl.value.trim();
  if (user) {
    reposEl.innerHTML = "";
    getUserRepos(user);
  } else {
    alert("Please Enter user!");
  }
}

function getUserRepos(user) {
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayRepos(data, user))
    .catch((err) => alert("Something went wrong!!" + err.message));
}

function displayRepos(repos, searchTerm) {
  if (repos.length == 0) {
    reposEl.innerHTML = "No Repos..!";
    return;
  }

  searchTermEl.innerHTML = searchTerm;

  repos.forEach((repo) => {
    let name = repo.owner.login + "/" + repo.name;
    reposEl.innerHTML += `
            <a href='https://github.com/${name}' class="repo-item" target="blank">
                <span>${repo.owner.login} / ${repo.name}</span>
                <span> ${
                  repo.open_issues_count > 0
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-check-square"></i>'
                } </span>
            </a>
        `;
  });
}

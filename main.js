//  ELEMENTS
let input = document.querySelector(".get-repos input");
let btn = document.querySelector(".get-repos button");
let showRepos = document.querySelector(".show-repos");

btn.addEventListener("click", () => {
  let repoName = String(input.value).trim();
  if (repoName) {
    showRepos.innerHTML = "";

    fetch(`https://api.github.com/users/${repoName}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found or request failed");
        }
        return response.json();
      })

      .then((response) => {
        response.forEach((element) => {
          console.log(element);

          //    PARENT FOR REPO NAME
          let repoBox = document.createElement("div");
          repoBox.classList = "repo-box";

          //    REPO NAME
          let spanName = document.createElement("span");
          spanName.classList = "name";
          spanName.textContent = element.name;

          //    PARENT FOR REPO STARS AND REPO LINK
          let repoData = document.createElement("div");
          repoData.classList = "repo-data";

          //    REPO STARS
          let stars = document.createElement("span");
          stars.classList = "stars";
          stars.textContent = `${element.stargazers_count} Stars`;

          //    REPO LINK
          let visit = document.createElement("a");
          visit.classList = "visit";
          visit.href = element.html_url;
          visit.target = "_blank";
          visit.textContent = "Visit";

          repoData.appendChild(stars);
          repoData.appendChild(visit);

          repoBox.appendChild(spanName);
          repoBox.appendChild(repoData);

          showRepos.appendChild(repoBox);
        });
      })
      .catch((error) => {
        //    PARENT FOR REPO NAME
        let repoBox = document.createElement("div");
        repoBox.classList = "repo-box";

        //    REPO NAME
        let spanName = document.createElement("span");
        spanName.classList = "name";
        spanName.textContent = error.message;
        spanName.style.textAlign = "center";
        spanName.style.fontSize = "25px";

        repoBox.appendChild(spanName);

        showRepos.appendChild(repoBox);
      });
  } else {
    console.log("no data");
  }
});

const qoutesForm = document.querySelector("form");
const main = document.getElementById("main");
const search = document.querySelector("input");
const avatar = document.getElementById("avatar");
getCharacter("itachi");

function getCharacter(char_name) {
  fetch("/quotes?character=" + char_name).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        createUserCard(data);
      }
    });
  });
}

qoutesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const char_name = search.value;
  if (char_name) {
    getCharacter(char_name);
    search.value = "";
  }
});

function createUserCard(user) {
  const cardHTML = `
            
            <div class="card">
              <div><img class="avatar" src="${user.image_url}" alt="${user.name}" /></div>
              <i class="fa1 fa fa-quote-right" aria-hidden="true"></i>
              <div class="text"> &ldquo; ${user.quote} &rdquo;	</div>
              <div class="author a1">&#150; ${user.name} </div>
            </div>`;
  main.innerHTML = cardHTML;
}

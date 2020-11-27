const qoutesForm = document.querySelector("form");
const main = document.getElementById("main");
const search = document.querySelector("input");
const imgs = document.querySelector(".avatar");
const txt = document.querySelector(".text");
const author = document.querySelector(".author");

let quotes;
let currentItem = 0;

getCharacter("itachi");

function getCharacter(char_name) {
  fetch("/quotes?character=" + char_name).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        createUserCard(data);
        quotes = data.quote;
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
  imgs.src = user.image_url;
  imgs.alt = user.name;
  txt.innerHTML = `&ldquo; ${user.quote[0]} &rdquo;`;
  author.innerHTML = `&#150; ${user.name}`;
}

txt.addEventListener("click", function () {
  $("#txt").fadeOut(function () {
    currentItem += 1;

    if (currentItem >= quotes.length) {
      currentItem = 0;
    }

    txt.innerHTML = `&ldquo; ${quotes[currentItem]} &rdquo;`;
  });

  $("#txt").fadeIn();
});

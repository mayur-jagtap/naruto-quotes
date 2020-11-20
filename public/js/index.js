const qoutesForm = document.querySelector("form");
const search = document.querySelector("input");
const quoteMessage = document.querySelector("#quotes");
qoutesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const char_name = search.value;
  console.log(char_name);

  fetch("http://localhost:3002/quotes?character=" + char_name).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          quoteMessage.textContent = data.quote;
        }
      });
    }
  );
});

function get() {
  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(snacks => {
      snacks.forEach(addSnackToTheDOM);
    });
}

get();

function addSnackToTheDOM(snack) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  copy.querySelector("h1").textContent = snack.name;
  copy.querySelector("h2").textContent = snack.taste;
  copy.querySelector("p").textContent = snack.price;
  copy.querySelector(".rating").textContent = snack.rating;

  document.querySelector("#app").prepend(copy);
}

function post() {
  const data = {
    name: "chocolate",
    taste: "sweet",
    price: 25,
    rating: 4
  };

  const postData = JSON.stringify(data);
  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      addSnackToTheDOM(data);
    });
}

document.querySelector("button").addEventListener("click", e => {
  post();
});

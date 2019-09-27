const form = document.querySelector("form#addForm");
const formEdit = document.querySelector("form#editForm");
form.setAttribute("novalidate", true);

form.elements.snackName.addEventListener("focus", e => {
  form.elements.snackName.classList.remove("notValid");
});
form.elements.snackName.addEventListener("blur", e => {
  if (form.elements.snackName.checkValidity()) {
    form.elements.snackName.classList.remove("notValid");
  } else form.elements.snackName.classList.add("notValid");
});

form.addEventListener("submit", evt => {
  post();
  evt.preventDefault();
});

formEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  put();
});

function get() {
  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=uft-8",
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

  copy.querySelector("article.snack").dataset.snackid = snack._id;

  copy.querySelector("h1").textContent = snack.name;
  copy.querySelector("h2").textContent = snack.taste;
  copy.querySelector("p").textContent = snack.price;
  copy.querySelector(".rating").textContent = snack.rating;

  copy.querySelector("button.btnDelete").addEventListener("click", e => {
    const target = e.target.parentElement;
    target.classList.add("remove");

    e.target.parentElement.addEventListener("transitionend", e => {
      deleteSnack(snack._id);
      if (e.propertyName == "opacity") {
        target.remove();
      }
    });
  });

  copy.querySelector("button.btnEdit").addEventListener("click", e => {
    fetchAndPopulate(snack._id);
  });

  document.querySelector("#app").prepend(copy);
}

function fetchAndPopulate(id) {
  fetch(`https://frontend2019-7c5c.restdb.io/rest/snacks/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=uft-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(snacks => {
      formEdit.elements.snackName.value = snacks.name;
      formEdit.elements.snackTaste.value = snacks.taste;
      formEdit.elements.snackPrice.value = snacks.price;
      formEdit.elements.snackRating.value = snacks.rating;
      formEdit.elements.id.value = snacks._id;
    });
}

function post() {
  const data = {
    name: form.elements.snackName.value,
    taste: form.elements.snackTaste.value,
    price: form.elements.snackPrice.value,
    rating: form.elements.snackRating.value
  };

  addSnackToTheDOM(data);

  const postData = JSON.stringify(data);
  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks", {
    method: "post",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

function put() {
  const data = {
    name: formEdit.elements.snackName.value,
    taste: formEdit.elements.snackTaste.value,
    price: formEdit.elements.snackPrice.value,
    rating: formEdit.elements.snackRating.value
  };

  let postData = JSON.stringify(data);
  const snackId = formEdit.elements.id.value;

  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks/" + snackId, {
    method: "put",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(updatedSnack => {
      const parentElement = document.querySelector(
        `.snack[data-snackid="${updatedSnack._id}"]`
      );

      parentElement.querySelector("h1").textContent = updatedSnack.name;
      parentElement.querySelector("h2").textContent = updatedSnack.taste;
      parentElement.querySelector("p").textContent = updatedSnack.price;
      parentElement.querySelector(".rating").textContent = updatedSnack.rating;
    });
}

function deleteSnack(id) {
  fetch("https://frontend2019-7c5c.restdb.io/rest/snacks/" + id, {
    method: "delete",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5d887741fd86cb75861e260a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      // document.querySelector(`.snack[data-snackid="${id}"]`).remove();
    });
}

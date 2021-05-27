let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => data.forEach(renderToy))

  const toyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')

  toyForm.addEventListener('submit', addNewToy)
  toyCollection.addEventListener('click', increaseLikes)

});


const toyCollection = document.querySelector ("#toy-collection");

function renderToy(toy) {
    let toyDiv = document.createElement('div');
    let toyName = document.createElement('h2');
    let toyImg = document.createElement('img');
    let likes = document.createElement('p');
    let likeBtn = document.createElement('button');
    toyDiv.className = "card";
    toyName.textContent = toy.name;
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";
    likes.textContent = `${toy.likes} likes`;
    likes.className = "numLikes"
    likeBtn.className = "like-btn";
    likeBtn.id = toy.id;
    likeBtn.dataset.likes = toy.likes
    likeBtn.textContent = "like";

    toyDiv.append(toyName);
    toyDiv.append(toyImg);
    toyDiv.append(likes);
    toyDiv.append(likeBtn);
    toyCollection.append(toyDiv)
}

function addNewToy(e) {
  e.preventDefault();
  console.log(e.target)
  let toyName = e.target.name.value;
  let toyUrl = e.target.image.value;
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyUrl,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(renderToy)
}

function increaseLikes(e) {
  if (e.target.className === 'like-btn') {
    let newLikes = parseInt(e.target.dataset.likes) + 1
    e.target.dataset.likes = newLikes
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(res => res.json())
    .then(() => e.target.previousSibling.innerHTML = `${newLikes} likes`)
  }
}
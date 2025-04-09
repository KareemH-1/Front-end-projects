const accessKey = "c2RW-O90f7G9uebVgFHrPSGpRq735UQJtB66m2kvv_E";

const form = document.querySelector("form");
const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const showMoreButton = document.getElementById("show-more-button");

let info = "";
let page = 1;

async function searchImages() {
  info = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${info}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    results.innerHTML = "";
  }

  const searchResults = data.results;

  searchResults.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    results.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});

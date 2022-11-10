"use strict";
// EXEMPEL på hur vår kod ska bygggas: https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=abc12378asdashdjsah8sds&text=banana=per_page=20&sort=date-taken-asc&format=json
const btnEl = document.querySelector("#search-btn");
const searchString = document.querySelector("#search-string");

/******************************************************************************/

function createImgElement(url, title) {
  const photosWrapper = document.querySelector("#photos");
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", url);
  imgElement.setAttribute("title", title);
  photosWrapper.append(imgElement);
}
/******************************************************************************/

function renderImages(imagesFromApi) {
  // console.log("Bara bilder --->", imagesFromApi.photos.photo);

  const photosWrapper = document.querySelector("#photos");
  photosWrapper.innerHTML = ""; // tömmer bilderna efter varje sökning

  const allPhotos = imagesFromApi.photos.photo;
  // console.log("alla bilder --->", allPhotos);

  for (const eachPhoto of allPhotos) {
    if (eachPhoto.farm !== 0) {
      console.log("enskilda bilder --->", eachPhoto.title);

      const IMG_URL = `https://farm${eachPhoto.farm}.staticflickr.com/${eachPhoto.server}/${eachPhoto.id}_${eachPhoto.secret}_q.jpg`;
      // console.log("bild-url -->", IMG_URL);
      const title = eachPhoto.title;

      createImgElement(IMG_URL, title);
    }
  }
}

/******************************************************************************/

async function getImages(search) {
  const BASE_URL = "https://api.flickr.com/services/rest?";
  const API_KEY = "api_key=5e40975ed7d02950a1425b5463a1f37d";
  const METHOD = "&method=flickr.photos.search";
  const MISC = `&format=json&nojsoncallback=1`;
  const URL = `${BASE_URL}${API_KEY}${METHOD}&text=${search}${MISC}`;
  console.log("VÅR API url: -->", URL);

  const response = await fetch(URL);
  console.log(response);
  const data = await response.json();
  console.log(data);

  renderImages(data);
}

/******************************************************************************/
btnEl.addEventListener("click", function () {
  const userSearch = searchString.value;
  console.log("Användarens nuvarande sökord --->", userSearch);
  getImages(userSearch);
});

// try {
//   const BASE_URL = "https://api.flickr.com/services/rest?";
//   const API_KEY = "api_key=5e40975ed7d02950a1425b5463a1f37d";
//   const METHOD = "&method=flickr.photos.search";
//   const MISC = `&format=json&nojsoncallback=1`;
//   const URL = `${BASE_URL}${API_KEY}${METHOD}&text=${search}${MISC}`;
//   console.log("VÅR API url: -->", URL);
// } catch (error) {
//   const response = await fetch(URL);
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
// }
/******************************************************************************/

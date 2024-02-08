// API KEY PHOTON
// 563492ad6f917000010000018cfc4c3b400242eba52872a80c417ee6

// VARIALBES
const auth = "563492ad6f917000010000018cfc4c3b400242eba52872a80c417ee6";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Events Listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e) {
    searchValue = e.target.value;
};

// Fetch API

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
            }
        });
        const data = await dataFetch.json();
        return data;
}

// Generate pictures

function generatePictures(data) {
        data.photos.forEach(photo => {
            const galleryImg = document.createElement("div");
            galleryImg.classList.add('gallery-img');
            galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}> </img>
            `;
            gallery.appendChild(galleryImg);
            });
}
function noResults() {
    const newHeader = document.createElement("div");
    newHeader.classList.add('.no-results');
    newHeader.innerHTML = `
    <h1>Sorry, We don't have photos for you :(</h1>
    `;
    gallery.appendChild(newHeader);
}

// Curated Photos

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink); 
    generatePictures(data);  
}

//Search Photos

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page1`;
    const data = await fetchApi(fetchLink);
    if(data.total_results === 0) {
        noResults();
    } else {
    generatePictures(data); 
    console.log(data.total_results);
    }
}

//Clear input

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

// More photos

async function loadMore() {
     page++;
     if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
     } else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
     }
     const data = await fetchApi(fetchLink);
     generatePictures(data);
}

curatedPhotos();
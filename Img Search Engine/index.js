const accessKey = "WMN6wPpKvOHWK1L8xkgoGn3rwJ6pSza8t5S1FQv3Gbs";
//got an api access key from uplansh which is stored in variable accessKey

const formE1 =  document.querySelector("form")
//input bar and and button inside the html are linked together in the html using the form element 
//this gives us the compete html from the form element and stores that in formE1

    console.log(formE1)

const inputE1 = document.getElementById("search-input");
console.log(inputE1)
//for now we dont know what this


const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputE1.value;

    console.log(inputData);

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;


    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const results = data.results;
   
    if(page === 1){
        searchResults.innerHTML = "";
    }   
        results.map((result) => {
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
            searchResults.appendChild(imageWrapper);
        });
    
    page++;
    if(page > 1){
        showMore.style.display = "block"
    }
    }
   

formE1.addEventListener("submit" , (event) => {
    event.preventDefault()
    page = 1;
    searchImages()
});

showMore.addEventListener("click", () => {
    searchImages()
});
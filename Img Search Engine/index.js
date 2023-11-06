const accessKey = "WMN6wPpKvOHWK1L8xkgoGn3rwJ6pSza8t5S1FQv3Gbs";
//got an api access key from uplansh which is stored in variable accessKey

const formE1 =  document.querySelector("form")
console.log(formE1)
//input bar and and button inside the html are linked together in the html using the form element 
//this gives us the compete html from the form element and stores that in 
//at the end both of the button and input bar are used together to call theactuall function


const inputE1 = document.getElementById("search-input");
//we cant console its value rn because the user has not put in the value till now, putting in inside the function we are going to call is different because when we call the funtion the user would have inputed the function, and when we sublmit the form the main function gets called inside of what is the  log statment for its value
console.log(inputE1.value)
//this brings the whole input elemrnt and stores it in the inputE1
//which is used to get the user input using the ".value" function


const searchResults = document.querySelector(".search-results")
console.log(searchResults)
//brings in/selects the whole div which contains all the cards for the images


const showMore = document.getElementById("show-more-button")
//we selected it it using the ID because it gives us this specific element only

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputE1.value;

    console.log(inputData);

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    console.log(url)

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
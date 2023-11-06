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





// let inputData = ""
let page = 1;
//we define this variable outside of the function becauase if would have did it inside the function it would change it back to 1/defined value whenever we try to call the function
//it will be used in the api url to ask for new pictures avery time, as it is going to add one/change the page keyword everytime we try to fetch the data new data every time




async function searchImages(){
    
    //made a syncronus function to use await and to run the code in background

    inputData = inputE1.value;

    //this gives us the value that is in the input bar when we call the function
    //if we just change the value of the, input in the bar and press show more it will show the next card according to the new text in the search 
    console.log(inputData);
    //this will simply log the value that is in the input bar at the time the function is called


    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    //page determines the differnce in the output
    //inputData -  detemines what to bring the data about
    //acccessKey - it is the unique key that diffenrentate the users

    console.log(url)


    const response = await fetch(url);
    //gives back a JSON 
    const data = await response.json();
    console.log(data);
    //it converts the javascritpt object notation into simple notation which is accessable in the js

    const results = data.results;

    console.log(results)
    //this accesess the data property in the object and gives us acess to that 
   

    
    if(page === 1){
        searchResults.innerHTML = "";
    }   
    //this removes all the preEmtered html in so that we can push new stuff into it 
    //if dont put this in everything will still work but the initial tempelates will not be removed and neww stuff will be pushed after it: but will be pushed

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
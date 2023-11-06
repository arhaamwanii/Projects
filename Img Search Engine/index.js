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

    //results is the data we are getting from the website whcih we now need to get showed on our website in an dynamic way

    console.log(results)
    //this accesess the data property in the object and gives us its values, these are the values we need to change our elements to in html
   

    
    if(page === 1){
        searchResults.innerHTML = "";
    }   
    //not that big of a deal 
    //this removes all the preEmtered html in so that we can push new stuff into it 
    //if dont put this in everything will still work but the initial tempelates will not be removed and neww stuff will be pushed after it: but will be pushed

    //".map" is a way to transform each element of an array
 
        results.map((result) => {
        
            //results is the data array wwe got back from the api -- and contains all the data to which we need to apend our html
            //  "RESULT"   its just a reptresentation of each data point that are present in the array results

            //first we have got nothing to do with the HTML - we are just playing with the results that have came back from the api
            //and putting these results into out Variables


            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            //we create a new constat and name it imageWrapper  - JS
            //create a new div inside of it
            //add a class to it which would makeit look just like template we had initally on our website - contains all the css 


            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            //we make a new const for the image and create an img element inside of it
            //we put the source of this image equal to the "RESULT.URLS.SMALL" which is the location of the url of the image in the api data


            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;
            //siimilarly we create a "A" element and 
            //make it open in a new tab by adding target "_blank"
            //we make its text content equal to the text we got from the api


            //append means adding something to the end of a written document
            //we need to append something that is dynamic i.e it is constantly changing - fetching data constantly also maeks something dynamic

            imageWrapper.appendChild(image);
            //we are adding the const image we created to the end of the image wrapper making 

            imageWrapper.appendChild(imageLink);
            //we also add the imageLink(a attribute) to the imagewrapper

            searchResults.appendChild(imageWrapper);
            //      "searchResult" is a element in the HTML which we have imported here in JS  
            //we have removed everything that was present in the inner html earlier in this function, but we have done it dynamically not in the actuall solid html file so we can still edit it
            //now we append(ADD) image wrapper which conatins the image and the anchor tag to the search results
            
        });
    
    page++;
    //as the page variable was created outside of the function and we are only calling the function again so it its numeber will increase by one rather than changing its back to the inital one as we are not revisiting the code
    //what it will do is that it will fetch new "RESULT" for our "RESULTS" as it changes the page no in the API fetvh url as well

    

    //BY default show more button is hidden this makes the button visible once we call the function i.e style.display would be changed to block from hidden
    if(page > 1){
        showMore.style.display = "block"
    }
    }
   

//formE1 is the the representation of the form element - button + input together
//we simply add event listner to it, for submit 
//and then calls the function 
//also resets the page var to one


formE1.addEventListener("submit" , (event) => { //the event here represents the submit - we did it because we had to add the prevent default behaviour to it
    event.preventDefault()
    //it prevents the default behaviour of the event/element in js

    page = 1;
    searchImages()
});



showMore.addEventListener("click", () => {
    searchImages()
});

//simply if someone clicks on show more call the function search imges i.e add a page 
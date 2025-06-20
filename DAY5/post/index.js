let root=document.getElementById("root");
let input = document.createElement("input");
root.appendChild(input); // creating input element and appending to root element
input.setAttribute("type", "text"); // setting type of input element to text
input.setAttribute("placeholder", "search title"); // setting placeholder for input element
async function fetchPosts() {
    let post = await fetch("https://jsonplaceholder.typicode.com/posts"); // making a request to server and store response post variable
    let data = await post.json(); //converting post response into json format
    //got array of  object as response
    let titles = data.map((obj) => {
        return obj.title;
    }); // extracting titiles from object and create new array that contains only titles
    // array titles
    let userinput = input.value; // getting value from input element
    const filterPost = titles.filter((title) => title.includes(userinput));
    filterPost
        .sort()
        .reverse()
        .map((title) => {
            let titleElement = document.createElement("h1"); // creating a new div element for each title
            titleElement.textContent = title; // setting the text content of the div to the title
            root.appendChild(titleElement) // appending each title to root element
        });
    }
fetchPosts();
// fetchPosts(); // Calls the function to fetch and display posts

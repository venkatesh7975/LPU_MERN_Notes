async function fetchPosts() {
  let post = await fetch("https://jsonplaceholder.typicode.com/posts"); // making a request to server and store response post variable
  let data = await post.json(); //converting post response into json format
  //got array of  object as response
  let titles = data.map((obj) => {
    return obj.title;
  }); // extracting titles from object and create new array that contains only titles
  // array titles
  let userinput = "sunt";
  const filterPost = titles.filter((title) => title.includes(userinput));
  filterPost
    .sort()
    .reverse()
    .map((title) => {
      console.log(title);
    });
}
fetchPosts();

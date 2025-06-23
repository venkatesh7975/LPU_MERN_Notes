let root = document.getElementById("root");

async function fetchData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  console.log(data);
  // Extracting titles from the data

  for (let i = 0; i < data.length; i++) {
    let h1 = document.createElement("h1");
    h1.textContent = i + 1 + " " + data[i].title;
    root.appendChild(h1);
  }
}
fetchData();

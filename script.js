let data = [];

async function fetchData() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  try {
    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=X3UD6bdKKSPji4Vo8KyFVKXgqO1BQMjNNga4O9xF&count=20");
    const result = await res.json();

    console.log(result);
     //debugging

    //store all data no fltr
    data = result;

    displayData(data);

  } catch (error) {
    console.log("Error:", error);
  }

  loader.style.display = "none";
}

fetchData();


//DIsplay fxn
function displayData(arr) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  arr.forEach(item => {

    // skip-vids
    if (item.media_type !== "image") return;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.url}" onerror="this.src='https://via.placeholder.com/300'" />
      <h3>${item.title}</h3>
      <p>${item.date}</p>
    `;

    container.appendChild(div);
  });
}


// searchh
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(value)
  );

  displayData(filtered);


  
});
//darkmode
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("light");

  const btn = document.getElementById("toggleTheme");
  btn.textContent = document.body.classList.contains("light") ? "Dark" : "Light";
});

document.getElementById("sort").addEventListener("change", (e) => {
  const value = e.target.value;

  // .slice() makes a copy so we don't mess up original data
  const sorted = data.slice().sort((a, b) => {
    if (value === "title") {
      return a.title.localeCompare(b.title); 
    } else if (value === "date") {
      return b.date.localeCompare(a.date); 
    }
    return 0;
  });

  displayData(sorted);
});
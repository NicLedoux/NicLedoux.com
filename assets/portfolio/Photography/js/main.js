//Template for Fetch API

fetch(
  "https://api.unsplash.com/photos/random?collections=11649432&client_id=y2dh3Wh6o260COJkWkbccqT_CW7K5AhFvJ26WBeHAZk&count=20"
)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    console.log(data.length);
    const list = document.getElementById("list");
    const ul = document.createElement("ul");

    for (let i = 0; i <= data.length; i++) {
      if (data[i] != undefined) {
        ul.setAttribute("style", "padding: 0; margin: 0;");
        ul.setAttribute("id", "pictureList");
        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");
        const div = document.createElement("img");
        li.setAttribute("class", "imageLI");
        img.setAttribute("src", data[i].urls.regular);
        a.setAttribute("href", data[i].links.html);
        a.setAttribute(
          "title",
          data[i].user.first_name + " " + data[i].user.last_name
        );
        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(img);
        list.appendChild(ul);
      }
    }
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

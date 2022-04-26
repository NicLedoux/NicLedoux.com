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
      if (data.length == 20) {
        ul.setAttribute("style", "padding: 0; margin: 0;");
        ul.setAttribute("id", "pictureList");
        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");
        const div = document.createElement("div");
        li.setAttribute("class", "imageLI");
        img.setAttribute("src", data[i].urls.regular);
        a.setAttribute(
          "href",
          data[i].links.html +
            "?utm_source=NicLedouxPortfolio&utm_medium=referral"
        );

        a.setAttribute(
          "title",
          "Photo by Unsplash User " +
            data[i].user.first_name +
            " " +
            data[i].user.last_name
        );
        list.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(img);
      } else {
        const p = document.createElement("p");
        list.appendChild(p);
        document.querySelector("p").innerText =
          "Unsplash's hourly rate limit has been exceeded. Please try again later.";
      }
    }
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

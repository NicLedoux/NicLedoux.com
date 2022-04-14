//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getFetch);

//Press enter to searhc instead of clicking button
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getFetch();
  }
});

function getFetch() {
  const choice = document.querySelector("input").value;
  console.log(choice);
  document.getElementById("displayDate").innerHTML = `${choice}`;
  const url = `https://api.nasa.gov/planetary/apod?api_key=EbqV3DuusLFCylIAoYWB9jeekfGJm4xitpvCA2u7&date=${choice}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      document.querySelector("img").classList.remove("hidden");
      console.log(data);
      document.getElementById("title").innerText = data.title;
      if (data.media_type === "image") {
        document.querySelector("img").classList.remove("hidden");
        document.querySelector("a").classList.remove("hidden");
        document.querySelector("a").href = data.hdurl;
        document.querySelector("img").src = data.url;
        document.querySelector("iframe").classList.add("hidden");
      } else if (data.media_type === "video") {
        document.querySelector("img").classList.add("hidden");
        document.querySelector("iframe").classList.remove("hidden");
        document.querySelector("iframe").src = data.url;
        document.querySelector("a").classList.add("hidden");
        document.querySelector("small").classList.add("hidden");
      }
      document.querySelector("p").innerText = data.explanation;
      if (data.copyright != null && data.media_type === "image") {
        document.querySelector("small").classList.remove("hidden");
        let copyright = data.copyright;
        document.querySelector("small").innerText = `Photo by ${copyright}`;
      } else if (data.copyright != null && data.media_type === "video") {
        document.querySelector("small").classList.remove("hidden");
        let copyright = data.copyright;
        document.querySelector("small").innerText = `Video by ${copyright}`;
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

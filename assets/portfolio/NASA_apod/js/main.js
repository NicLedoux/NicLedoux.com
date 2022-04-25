document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  const choice = document.querySelector("input").value;
  console.log(choice);

  // const date = new Date(data.date);
  // console.log(data.date);
  // const dateOptions = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  // const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  // document.getElementById("displayDate").innerHTML = date.toLocaleDateString(
  //   "en-US",
  //   dateOptions
  // );
  const url = `https://api.nasa.gov/planetary/apod?api_key=EbqV3DuusLFCylIAoYWB9jeekfGJm4xitpvCA2u7&date=${choice}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const date = new Date(data.date);
      console.log(data.date);
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      };

      const formattedDate = date.toLocaleDateString("en-US", dateOptions);

      document.getElementById("displayDate").innerHTML =
        date.toLocaleDateString("en-US", dateOptions);
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

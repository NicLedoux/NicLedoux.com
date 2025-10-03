document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data[0]);
      let wowMP3 = data[0].audio;

      //Remove Hidden Elements
      document.querySelector("h1").classList.remove("hidden");
      document.getElementById("released").classList.remove("hidden");
      document.getElementById("movie-desc").classList.remove("hidden");
      document.getElementById("webAppDesc").classList.add("hidden");
      document.getElementById("moviePoster").classList.remove("border");

      //End Remove Hidden Elements

      //Date Formatter

      const date = new Date(data[0].release_date);
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      console.log(formattedDate);

      document.querySelector("img").src = data[0].poster;
      document.getElementById("timestamp").innerText = data[0].timestamp;
      document.getElementById("char").innerText = data[0].character;
      document.getElementById("full_line").innerText = data[0].full_line;
      document.getElementById("wowCount").innerText =
        data[0].total_wows_in_movie;
      document.getElementById("wowCurrent").innerText =
        data[0].current_wow_in_movie;
      document.querySelector("h1").innerText = data[0].movie;
      document.getElementById("releaseDate").innerText = formattedDate;

      let sound = document.createElement("audio");
      document.getElementById("audioDiv").appendChild(sound);
      sound.id = "audio";
      // sound.controls = "controls";
      sound.src = "";
      sound.type = "audio/mp3";
      document.querySelector("audio").src = document.querySelector(
        "audio"
      ).src = data[0].audio;

      const playAudio = () => document.getElementById("audio").play();
      const myTimeout = setTimeout(playAudio, 2000);
      // setTimeout("playAudio()", 3000);
      document.querySelector("button").innerText = "Wow me again";
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}

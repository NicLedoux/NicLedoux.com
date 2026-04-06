const BASE_URL = "/api/apod";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

function renderMedia(data) {
  document.getElementById("title").innerText = data.title;
  document.getElementById("displayDate").innerText = new Date(
    data.date,
  ).toLocaleDateString("en-US", dateOptions);
  document.querySelector("p").innerText = data.explanation;

  if (data.media_type === "image") {
    document.querySelector("img").classList.remove("hidden");
    document.querySelector("a").classList.remove("hidden");
    document.querySelector("a").href = data.hdurl;
    document.querySelector("img").src = data.url;
    document.getElementById("iframeContainer").classList.add("hidden");
  } else if (data.media_type === "video") {
    const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(data.url); // Checks file extension for video files
    document.querySelector("img").classList.add("hidden");
    document.querySelector("a").classList.add("hidden");

    if (isDirectVideo) {
      //hides iframe container if direct video file and shows video container.
      document.getElementById("iframeContainer").classList.add("hidden");
      document.querySelector("iframe").src = "";
      document.getElementById("videoSource").src = data.url;
      document.querySelector("video").load();
      document.getElementById("videoContainer").classList.remove("hidden");
    } else {
      document.getElementById("videoContainer").classList.add("hidden");
      document.getElementById("iframeContainer").classList.remove("hidden");
      document.querySelector("iframe").src = data.url;
    }
  } else {
    document.querySelector("img").classList.add("hidden");
    document.querySelector("a").classList.add("hidden");
    document.getElementById("iframeContainer").classList.add("hidden");
    document.querySelector("small").classList.add("hidden");
    document.querySelector("p").innerText =
      "This archive entry contains legacy media that can't be displayed. " +
      data.explanation;
  }

  if (data.copyright != null) {
    const mediaLabel = data.media_type === "video" ? "Video" : "Photo";
    document.querySelector("small").classList.remove("hidden");
    document.querySelector("small").innerText =
      `${mediaLabel} by ${data.copyright}`;
  }
}

function todaysPic() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("datePicker").valueAsDate = new Date();
      renderMedia(data);
    })
    .catch((err) => console.log(`error ${err}`));
}

function getFetch() {
  const choice = document.querySelector("input").value;
  fetch(`${BASE_URL}?date=${choice}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderMedia(data);
    })
    .catch((err) => console.log(`error ${err}`));
}

document.querySelector("button").addEventListener("click", getFetch);
document.addEventListener("DOMContentLoaded", todaysPic);

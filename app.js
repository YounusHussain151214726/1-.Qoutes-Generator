const qouteIs = document.getElementById("qoute");
const author = document.getElementById("author");
const nextQoute = document.getElementById("next");
const tweet = document.getElementById("tweet");
const loader = document.getElementById("loader");
const container = document.getElementById("container");

var apiQoutes = [];

const Qoutes = () => {
  let qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
  qouteIs.textContent = qoute.text;

  if (qoute.author) {
    author.textContent = qoute.author;
  } else {
    author.textContent = "Unknown";
  }
  console.log(qoute);
};

function Loading(value) {
  console.log(value);

  if (value === true) {
    loader.hidden = true;
    qouteIs.textContent =
      "Just trust yourself, then you will know how to live.";
    author.textContent = "Goethe";
  } else if (value === false) {
    loader.hidden = false;
    container.hidden = true;
  }
}

const getQoutes = async () => {
  Loading(true);

  try {
    const apiUrl = `https://type.fit/api/quotes`;
    const fetchs = await fetch(apiUrl);
    const response = await fetchs.json();
    console.log(response);
    if (response) {
      apiQoutes = response;
      Qoutes();
    }
  } catch (error) {
    Loading(false);
    throw error;
  }
};
getQoutes();

const twitter = () => {
  const tweeturl = `https://twitter.com/intent/tweet?text=${qouteIs.textContent} - ${author.textContent}`;
  window.open(tweeturl, "_blank");
};

nextQoute.addEventListener("click", Qoutes);
tweet.addEventListener("click", twitter);

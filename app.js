//1 api to get movie sort  by popularity
//2nd api to get img link must use 1280
//3rd api used to search movie query (used 3 version of api)
//1.
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6b89fbd46bfe6270024222b94b148938&page=4";
const imgpth = "https://image.tmdb.org/t/p/w1280";

const srchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
//10.
const tagsElement = document.getElementById("tags");

//9.

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

//11.
//initially selectedgenre is blank
selectedGenre = [];
setGenre();

function setGenre() {
  tagsElement.innerHTML = "";
  // after call the function setGenre genre cleared using innerHtml="";
  genres.forEach((genre) => {
    const tg = document.createElement("div");
    tg.classList.add("tag");
    tg.id = genre.id;
    tg.innerText = genre.name;
    tg.addEventListener("click", (e) => {
      selectedGenre.push(e.target.id);
      getmovies(apiUrl + "&with_genres=" + selectedGenre.join(","));
    });

    tagsElement.append(tg);
  });
}

//get favourite movies
//3.
getmovies(apiUrl);

//2. first fetch the url to get the response then data then we on console data
//but we want results so we do data.results to get results of data in console
function getmovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      moviesShow(data.results);
      console.log(data);
    });
}

//4.

function moviesShow(movies) {
  //clear main
  // clear for initialize
  main.innerHTML = "";
  movies.forEach((movie) => {
    // used  initials key of movie -> value
    // use destructuting to get the values -> movie
    const { poster_path, title, overview } = movie;
    // create a movieElement to put card on display
    const movieElement = document.createElement("div");
    //to get all classes use classList add to movie
    movieElement.classList.add("movie");
    // inert html elements on movieElement
    movieElement.innerHTML = `
            <img src="${imgpth + poster_path}" alt="${title}">
            <div class="movie-info">
            <h4>${title}</h4>

        </div>
        <div class="overview">
            <h4>"Overview"</h4>
            ${overview}
        </div>
            `;
    //after creating element put these using appendChild on the main dom
    //6.
    main.appendChild(movieElement);
  });
}

//for searching movie on seach bar we need to add evnt listner (event)
//preventDefault -> on pressing enter it search that movie
//5.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // it get the value that search
  //7.
  const searchTerm = search.value;
  //8.
  // if we search a value the get srchApi+searchTerm=value
  // else apiurl gives home page using apiUrl
  if (searchTerm) {
    getmovies(srchApi + searchTerm);
  } else {
    getmovies(apiUrl);
  }
});

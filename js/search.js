/* 
TV Search Tool
*/

// Search for a TV show; embed seasons 
const findShow = async (query) => {
  const embed = "&embed=seasons";
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${query}${embed}`;
  const response = await fetch(url);

  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: findShow(url) ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};

// Search for an artist
const findArtist = async (query) => {
  const url = `https://api.tvmaze.com/singlesearch/people?q=${query}`;
  const response = await fetch(url);

  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: findArtist(url) ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};

/* container host */
const createApp = () => {
  const app = document.createElement("div");
  app.id = "app";
  app.classList.add("app");

  return app;
};

    
    const displaySearchBar = () => {
      const searchDiv = `
      <div id="searchBar" class="search">
    <input type="radio" id="show-radio" name="search-type" value="show" checked>
    <label for="show-radio">Show</label>
    &#160&#160 <input type="radio" id="artist-radio" name="search-type" value="artist">
    <label for="artist-radio">Artist</label>
    &#160&#160 <input type="text" id="search-term" name="search-bar" placeholder="Enter Show/Artist Name" />
    <button id="submit" class="btn btn-primary">Search</button>
  </div>
    
      <style>
        #searchBar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
        }
    
        #search-term {
          width: 50%;
          height: 35px;
          padding: 0 10px;
          font-size: 18px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
    
        #submit {
          width: 10%;
        }
      </style>
    `;
      return searchDiv;
    };
    
    const displayShow = async (query) => {
      if (!query) {
        query = "Smackdown";
      }
    
      // Clear previous search results
      document.getElementById("app").innerHTML = "";
    
      // Perform search and display results
      const data = await findShow(query);
      
      const {
        name,
        image: { medium },
        summary,
        _embedded: { seasons }
      } = data;
      
      let html = `
      <img class="cover" src=${medium} alt="${name}" />
      <h2 class="title">${name}</h2>
      <div class="summary">
        <h3 class="summary-title">Description:</h3>
        <div class="card">
          <p>${summary}</p>
        </div>
        <div class="link">
        <a href="https://www.tvmaze.com/shows/${data.id}" target="_blank">More info on TVMaze</a>
      </div>
      <div id="seasons" class="seasons"></div>
    `;
      document.getElementById("app").innerHTML = html;
      
      // display the search bar after the show has been displayed
      const searchDiv = displaySearchBar();
      document.getElementById("app").innerHTML += searchDiv;
      
      return seasons;
    };

const displaySeasons = async (data) => {
    const seasonsDiv = document.getElementById("seasons");

    data.forEach((item) => {
        let html = "";
        let { name, number, image } = item;

        if (!name) {
            /*at random, for some items, the api returns null or an empty string
                this would handle that using the name of the show, as the season name. */
            name = document.getElementsByClassName("title").item(0).textContent;
        }

        if (!image) {
            /*at random, for some items, the api returns null 
                or an empty string as URL for the image URL.
                This code block handles this. */
            image = document.getElementsByClassName("cover").item(0).src;
        } else {
            let { medium } = image;
            image = medium;
        }
        html = `<div class="season">
                    <img 
                        class="season-cover" src=${image}
                    alt=${name}/>
                    <p class="season-title">${name}</p>
                    <p class="season-number">Season: ${number}</p>
                </div>`;
        seasonsDiv.innerHTML += html;
    });
};

(async function () {
  let loaded = false;
  let query = "";
  const body = document.body;
  const app = createApp();
  const h1 = document.createElement("h1");
  const searchDiv = displaySearchBar();

  h1.classList.add("title");
  h1.textContent = "TVMaze API";
  h1.style.textAlign = "center";
  h1.style.fontSize = "24px";
  h1.style.fontWeight = "bold";
  h1.style.color = "rgb(255, 99, 71)";

  app.appendChild(h1);
  app.innerHTML += searchDiv;
  body.appendChild(app);

  const searchButton = document.getElementById('submit');
  searchButton.addEventListener('click', async () => {
    const searchTerm = document.getElementById('search-term').value;
    const seasons = await displayShow(searchTerm);
    displaySeasons(seasons);
  });

  const searchInput = document.getElementById('search-term');
  searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      const searchTerm = document.getElementById('search-term').value;
      const seasons = await displayShow(searchTerm);
      displaySeasons(seasons);
    }
  });

  const showRadioButton = document.getElementById("show-radio");
const artistRadioButton = document.getElementById("artist-radio");

showRadioButton.addEventListener("change", () => {
  searchType = "show";
});

artistRadioButton.addEventListener("change", () => {
  searchType = "artist";
});
})();

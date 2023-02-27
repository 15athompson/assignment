document.getElementById('searchButton').addEventListener('click', function() {
    const searchValue = document.getElementById('inputSearch').value;
    searchPeople(searchValue);
  });

  async function searchPeople(query) {
    try {
      const searchResponse = await fetch(`http://api.tvmaze.com/search/people?q=${query}&limit=80`);
      const searchData = await searchResponse.json();
  
      const searchResultContainer = document.querySelector('#searchResult');
      searchResultContainer.innerHTML = '';
      
  
      searchData.forEach((result) => {
        const resultElement = `<div class="col-md-4">
                                <div class="card mb-4">
                                    <img src="${result.person.image.medium}" class="card-img-top" alt="${result.person.name}">
                                    <div class="card-body">
                                       <h5 class="card-title">${result.person.name}</h5>
                                       <a target="_blank" href="${result.person.url}" class="btn btn-primary">View Person</a>
                                    </div>
                                </div>
                            </div>`;
        searchResultContainer.insertAdjacentHTML('beforeend', resultElement);
      });
    } catch (error) {
      console.error(error);
    }
  }



const displayTVMazeInfo = async () => {
    try {
      // Search for people - done
      const peopleResponse = await fetch('http://api.tvmaze.com/people?limit=80');
      const peopleData = await peopleResponse.json();
  
      const peopleContainer = document.querySelector('#people');
      console.log(peopleContainer);
      peopleContainer.innerHTML = '';
  
      peopleData.forEach((person) => {
        if (person.image && person.image.medium) {
        const personElement = `<div class="col-md-4">
                                  <div class="card mb-4">
                                      <img src="${person.image.medium}" class="card-img-top" alt="${person.name}">
                                      <div class="card-body">
                                          <h5 class="card-title">${person.name}</h5>
                                          <a target="_blank" href="${person.url}" class="btn btn-primary">View Person</a>
                                      </div>
                                  </div>
                              </div>`;
        peopleContainer.insertAdjacentHTML('beforeend', personElement);
        }
      }); 
  
      
    } catch (error) {
      console.error(error);
    }
  };
  
  displayTVMazeInfo();

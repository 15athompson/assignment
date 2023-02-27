const displayTVMazeInfo = async () => {
    try {
      // Search for a range of seasons by ID
      const startId = 1;
      const endId = 42;
      const seasons = [];
    
      for (let seasonId = startId; seasonId <= endId; seasonId++) {
        const seasonResponse = await fetch(`http://api.tvmaze.com/seasons/${seasonId}`);
        const seasonData = await seasonResponse.json();
        seasons.push(seasonData);
      }
    
      const seasonsContainer = document.querySelector('#seasons');
      seasonsContainer.innerHTML = '';
    
      seasons.forEach((season) => {
        const seasonElement = `<div class="col-md-4">
                                  <div class="card mb-4">
                                      <img src="${season.image.medium}" class="card-img-top" alt="${season.name}">
                                      <div class="card-body">
                                          <h5 class="card-title">${season.name}</h5>
                                          <a target="_blank" href="${season.url}" class="btn btn-primary">View Season</a>
                                      </div>
                                  </div>
                              </div>`;
        seasonsContainer.insertAdjacentHTML('beforeend', seasonElement);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  displayTVMazeInfo();

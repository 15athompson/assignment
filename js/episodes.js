const displayTVMazeInfo = async () => {
    try {
      // Search for a range of episodes by ID
      const startId = 1;
      const endId = 100;
      const episodes = [];
    
      for (let episodeId = startId; episodeId <= endId; episodeId++) {
        const episodeResponse = await fetch(`http://api.tvmaze.com/episodes/${episodeId}`);
        const episodeData = await episodeResponse.json();
        episodes.push(episodeData);
      }
    
      const episodesContainer = document.querySelector('#episodes');
      episodesContainer.innerHTML = '';
    
      episodes.forEach((episode) => {
        const episodeElement = `<div class="col-md-4">
                                  <div class="card mb-4">
                                      <img src="${episode.image.medium}" class="card-img-top" alt="${episode.name}">
                                      <div class="card-body">
                                          <h5 class="card-title">${episode.name}</h5>
                                          <a target="_blank" href="${episode.url}" class="btn btn-primary">View Episode</a>
                                      </div>
                                  </div>
                              </div>`;
        episodesContainer.insertAdjacentHTML('beforeend', episodeElement);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  displayTVMazeInfo();

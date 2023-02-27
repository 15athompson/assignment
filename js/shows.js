const displayTVMazeInfo = async () => {
  try {
    // Search for TV shows
    const showsResponse
    = await fetch('http://api.tvmaze.com/shows');
    const showsData = await showsResponse.json();

    const showsContainer = document.querySelector('#shows');
    showsContainer.innerHTML = '';

    showsData.forEach((show) => {
      const showElement = `<div class="col-md-4">
                                <div class="card mb-4">
                                    <img src="${show.image.medium}" class="card-img-top" alt="${show.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${show.name}</h5>
                                        <a target="_blank" href="${show.url}" class="btn btn-primary">View Show</a>
                                    </div>
                                </div>
                            </div>`;
      showsContainer.insertAdjacentHTML('beforeend', showElement);
    });
  } catch (error) {
    console.error(error);
  }
};

displayTVMazeInfo();


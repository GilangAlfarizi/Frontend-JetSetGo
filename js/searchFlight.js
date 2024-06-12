// Mapping Flight Search Result
function getSearchResult() {
  const cardData = localStorage.getItem("searchResult");
  console.log(cardData);
  return JSON.parse(cardData);
}

function createFlightCard(flight) {
  document.getElementById("flightRoute").innerHTML =
    flight.departure_city + " - " + flight.arrival_city;

  const card = document.createElement("div");
  //   card.classList.add("col-lg-5", "mb-4");

  const departureTime = formatDateTime(flight.departure_time);
  const arrivalTime = formatDateTime(flight.arrival_time);
  document.getElementById("flightTime").innerHTML = departureTime;

  card.innerHTML = `
         <div class="row">
            <div class="button d-flex align-items-center justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" data-flight-id="${flight.id}" onclick="redirectToSummary(this)">
                <div class="col-3">
                    <img class="maskapai img-fluid" src=${flight.airline_image}>
                </div>
                <div class="col-5">
                    <div class="small text-muted">${flight.departure_city} - ${flight.arrival_city}, Lion Air</div>
                    <p class="card-title">${departureTime} - ${arrivalTime}</p>
                </div>
                <div class="col-5">
                    <div class="small text-muted">Direct flight, Lion Air</div>
                        <h4 class="harga">${flight.price}</h4>
                    </div>
            </div> 
        </div>
    `;

  return card;
}

function renderFlightCards() {
  const flightCardsContainer = document.getElementById("flightCards");
  const searchResults = getSearchResult();

  searchResults.forEach((flight) => {
    const card = createFlightCard(flight);
    flightCardsContainer.appendChild(card);
  });
}
renderFlightCards();

// Format Date
function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function redirectToSummary(card) {
    const flightId = card.dataset.flightId;
    // Lakukan apa pun yang perlu dilakukan dengan ID penerbangan, misalnya menyimpannya di local storage atau mengirimnya ke halaman summary
    localStorage.setItem("selectedFlightId", flightId);
    // Redirect ke halaman summary
    window.location.href = "clicked.html";
}
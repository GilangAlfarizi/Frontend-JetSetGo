// Fetch Flight Data for Side Bar
function fetchDetailFlight() {
  const flightId = parseInt(localStorage.getItem("selectedFlightId"));
  const flightDataString = localStorage.getItem("searchResult")
  const flightData = JSON.parse(flightDataString)
  const selectedFlight =  flightData.find(flight => flight.id === flightId)
  console.log(selectedFlight)

  const departureTime = formatDateTime(selectedFlight.departure_time);
  const arrivalTime = formatDateTime(selectedFlight.arrival_time);

  document.getElementById("flightRoute").innerHTML = selectedFlight.departure_city + " - " + selectedFlight.arrival_city
  document.getElementById("flightRoute2").innerHTML = selectedFlight.departure_city + " - " + selectedFlight.arrival_city
  document.getElementById("flightTime2").innerHTML = departureTime + " - " + arrivalTime

  document.getElementById("flightPrice").innerHTML = selectedFlight.price
  document.getElementById("flightTime").innerHTML = departureTime + " - " + arrivalTime
}
fetchDetailFlight()

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
  
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
  
    return `${hours}:${minutes}`;
  }

// Fetch Passanger Data
function fetchPassenger() {
  const userId = localStorage.getItem("userId");
  var token = localStorage.getItem("token");
  var headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
  };
  var config = {
      method: "GET",
      headers: headers,
  };
  
  var endpoint = "https://backend-jetsetgo.vercel.app/api/passenger/" + userId;

  fetch(endpoint, config)
  .then((response) => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then((data) => {
      console.log("Search Flight Successful:", data);

      const tableBody = document.getElementById("passengerTableBody");
      tableBody.innerHTML = "";

      if (Array.isArray(data.data)) {
          data.data.forEach((passenger) => {

            const formattedDate = formatDate(passenger.birth);
              const row = document.createElement("tr");
              const nameCell = document.createElement("td");
              const nationalityCell = document.createElement("td");
              const birthCell = document.createElement("td");
              const baggageCell = document.createElement("td");

              nameCell.textContent = `${passenger.first_name} ${passenger.last_name}`;
              nationalityCell.textContent = passenger.nationality;
              birthCell.textContent = formattedDate;
              baggageCell.textContent = `${passenger.baggage}kg`;

              row.appendChild(nameCell);
              row.appendChild(nationalityCell);
              row.appendChild(birthCell);
              row.appendChild(baggageCell);

              tableBody.appendChild(row);
          });
      } else {
          console.error("Data received is not in the expected format.");
      }
  })
  .catch((error) => {
      console.error("There was a problem with the search operation:", error);
  });
}
fetchPassenger();

// Format Date
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}

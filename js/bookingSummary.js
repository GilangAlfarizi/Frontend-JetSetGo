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
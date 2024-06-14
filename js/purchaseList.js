function fetchUserData () {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const apiUrl = "https://backend-jetsetgo.vercel.app/api/profile/" + userId;
    const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };
    const config = {
        method: "GET",
        headers: headers,
    };

    fetch(apiUrl, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      document.getElementById("username").innerHTML = data.data.first_name + " " + data.data.last_name
      document.getElementById("username2").innerHTML = data.data.first_name
      document.getElementById("nationality").innerHTML = data.data.nationality
      document.getElementById("email").innerHTML = data.data.email
    })
    .catch((error) => {
      console.error("There was a problem with the search operation:", error);
    });
}
fetchUserData()

// Format Date
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

function getDetailTicket(){
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const apiUrl = "https://backend-jetsetgo.vercel.app/api/ticket/detail/" + userId;
    const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };
    const config = {
        method: "GET",
        headers: headers,
    };

    fetch(apiUrl, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("ticket Data",data)
      console.log(data.data.flight)
      document.getElementById("flightRoute").innerHTML = data.data.flight.departure_city + " - " + data.data.flight.arrival_city
      document.getElementById("flighTime").innerHTML = formatDateTime(data.data.flight.departure_time) + " - " + formatDateTime(data.data.flight.arrival_time)
      document.getElementById("flightPrice").innerHTML = "Rp " + data.data.flight.price
    })
    .catch((error) => {
      console.error("There was a problem with the search operation:", error);
    });
}
getDetailTicket()
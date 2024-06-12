// Get current Date
const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
document.getElementById("currentTime").innerHTML = "Today, " + currentHour + ":" + currentMinute;

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

// Get Ticket Detail
function getTicketDetail () {
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
    
    var endpoint = "http://localhost:3000/api/ticket/detail/" + userId;
    fetch(endpoint, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Search Flight Successful:", data);
      document.getElementById("orderId").innerHTML = data.data.order.code
      document.getElementById("flightAirline").innerHTML = data.data.flight.airline
      document.getElementById("flightRoute").innerHTML = data.data.flight.departure_city + " - " + data.data.flight.arrival_city
      document.getElementById("flightDate").innerHTML = formatDateTime(data.data.flight.departure_time) + " : " + formatDateTime(data.data.flight.arrival_time) 
      document.getElementById("flightTime2").innerHTML = formatDateTime(data.data.flight.departure_time) + "-" + formatDateTime(data.data.flight.arrival_time) 
      document.getElementById("flightRoute2").innerHTML = data.data.flight.departure_city + " - " + data.data.flight.arrival_city
      document.getElementById("flightPrice").innerHTML = "Rp " + data.data.flight.price
    })
    .catch((error) => {
      console.error("There was a problem with the search operation:", error);
    });
}
getTicketDetail()

// Get Passenger Detail
function getDetailPassenger(){
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
    
    var endpoint = "http://localhost:3000/api/passenger/" + userId;
    fetch(endpoint, config)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Passenger", data);
        
        const flightInfoList = document.getElementById("flightInfoList");

        data.data.forEach((passenger) => {
            const passengerItem = document.createElement("ul");

            const passengerEntries = Object.entries(passenger);
            passengerEntries.forEach(([key, value]) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
                passengerItem.appendChild(listItem);
            });

            flightInfoList.appendChild(passengerItem);
        });
    })
    .catch((error) => {
        console.error("There was a problem with the search operation:", error);
    });
}
getDetailPassenger();

function updatePayment(){
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const apiUrl = "http://localhost:3000/api/order/" + userId;
    const data = {
        status: "Paid",
        payment_method: "Gopay"
    }    

    const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };
    const config = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    };

    fetch(apiUrl, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Payment Successful")
      console.log(data)
    })
    .catch((error) => {
      console.error("There was a problem with the search operation:", error);
    });
}

const submitButton = document.getElementById("payment")
submitButton.addEventListener("click", updatePayment)

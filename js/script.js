// Login Function
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;

    loginUser(email, password);
  });

function loginUser(email, password) {
  var data = { email: email, password: password };

  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error Login");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login Successfull:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user_id);
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error", error);
      alert("Login failed");
    });
}

// Register Function
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("registerUsername").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;

    registerUser(username, email, password);
  });

function registerUser(username, email, password) {
  var data = { username: username, email: email, password: password };

  fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error Resgister");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login Successfull:", data);
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error", error);
      alert("Login failed");
    });
}

//  Search Flight
document
  .getElementById("searchFlightForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var depart = document.getElementById("depart").value;

    searchFlight(from, to, depart);
  });

function searchFlight(from, to, depart) {
  var token = localStorage.getItem("token");
  var headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  var data = {
    from: from,
    to: to,
    depart: depart,
  };

  var endpoint =
    "http://localhost:3000/api/flight/search?from=" +
    encodeURIComponent(from) +
    "&to=" +
    encodeURIComponent(to) +
    "&departure_time=" +
    encodeURIComponent(depart);

  var config = {
    method: "GET",
    headers: headers,
  };

  fetch(endpoint, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Search Flight Successful:", data);
      localStorage.setItem("searchResult", JSON.stringify(data.data));
      window.location.href = "page/searchrevisi.html";
    })
    .catch((error) => {
      console.error("There was a problem with the search operation:", error);
    });
}

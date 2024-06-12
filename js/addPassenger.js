document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const profile_id = parseInt(localStorage.getItem("userId"));

    const firstName = document.getElementById("inputFirstName").value;
    const lastName = document.getElementById("inputLast").value;
    const nationality = document.getElementById("inputNationality").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dateOfBirth = document.getElementById("exampleInputDOB").value;
    const bags = document.querySelector('input[name="bags"]:checked').value;

    const passengerData = {
      first_name: firstName,
      last_name: lastName,
      nationality: nationality,
      gender: gender,
      birth: dateOfBirth,
      baggage: parseInt(bags),
      profile_id: profile_id,
    };
    console.log(passengerData);

    const endpoint = "http://localhost:3000/api/passenger/";
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    const config = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(passengerData),
    };

    fetch(endpoint, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Passenger data sent successfully:", data);
        alert("Passenger Data successfully created");
        window.location.href = "/page/clicked.html";
      })
      .catch((error) => {
        console.error("There was a problem sending passenger data:", error);
      });
  });
});

import { airlines, flights_jan_01_2008 } from "./airline-data.js";

window.addEventListener("load", function () {
  // Main array containing flight time details
  const mainArray = [];

  //function for getting the optimized data
  function seprateByTime(flightCode) {
    const finalObject = flights_jan_01_2008
      //here we are filtering all the flights that are of a same airline
      .filter((flight) => {
        if (
          flight != null &&
          flight.airline &&
          flight.time &&
          flight.airline === flightCode
        ) {
          return true;
        }
      })
      // here we are calculating total flights of that airline in diffrent hours
      .reduce((acc, curr) => {
        if (acc[curr.time.substring(0, 2)]) {
          acc[curr.time.substring(0, 2)] = ++acc[curr.time.substring(0, 2)];
        } else {
          acc[curr.time.substring(0, 2)] = 1;
        }
        return acc;
      }, {});

    mainArray.push(finalObject);
  }

  const keys = Object.getOwnPropertyNames(airlines);
  keys.map((flightCode) => {
    seprateByTime(flightCode);
  });

  // Selecting main table to append flight details
  const mainTable = document.getElementById("table");

  // For each flight
  for (let i = 0; i < keys.length; i++) {
    let flightCode = keys[i];

    // Creating each flight row
    let flightRow = document.createElement("div");
    flightRow.classList.add("row");
    flightRow.classList.add(flightCode);

    // Creating each flight name
    let flightName = document.createElement("div");
    flightName.classList.add(`flight-name`);
    flightName.id = `${flightCode}`;
    flightName.innerText = `${airlines[flightCode]}`;

    // Appending flight name
    flightRow.appendChild(flightName);

    // Creating Flight hour details, here 24 is no. of hours
    for (let hour = 1; hour <= 24; hour++) {
      const detail = mainArray[i];
      let data;
      if (hour <= 10) {
        data = detail[`0${hour - 1}`];
      } else if (hour > 10) {
        data = detail[`${hour - 1}`];
      }

      if (data == undefined) {
        data = "-";
      }

      // Add the flight data
      let flightHourDetails = document.createElement("div");
      flightHourDetails.classList.add("cell");
      flightHourDetails.id = `${flightCode}-hour-${hour}-p`;
      flightHourDetails.innerText = data;

      // Appending each flight details into ui
      flightRow.appendChild(flightHourDetails);
    }

    // Appending flight row into table
    mainTable.appendChild(flightRow);
  }
});

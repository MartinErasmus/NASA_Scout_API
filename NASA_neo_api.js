import fetch from "node-fetch";
 
function getScout(){
  fetch(
    `https://ssd-api.jpl.nasa.gov/scout.api`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
 });
}

getScout()
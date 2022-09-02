import SwitcherColor from "./index.js";
SwitcherColor();
// Variables
const back  = document.querySelector(".back");
// Get ID of COUNTRY
const ID = window.localStorage.getItem("id");
// API CONTRY
const GetApi = async () => {
  await fetch(`https://restcountries.com/v3.1/name/${ID}?fullText=true/all`)
    .then((res) => res.json())
    .then((data) => {
      fillDescription(data);
      back.addEventListener("click", () => window.location.href='./index.html');
    });
};
// fill Information by id
const fillDescription = (data) => {
  // get element
  const flag = document.querySelector(".flag img");
  const country__name = document.querySelector(".country__name h1");
  const nativeName = document.querySelector(".nativeName");
  const population = document.querySelector(".population");
  const region = document.querySelector(".region");
  const subRegion = document.querySelector(".subRegion");
  const capital = document.querySelector(".capital");
  const domain = document.querySelector(".domain");
  const currencies = document.querySelector(".currencies");
  const languages = document.querySelector(".languages");
  // Implemantion info
  flag.src = data[0].flags["png"];
  country__name.innerHTML = data[0].name["common"];
  nativeName.innerHTML =
    data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].official;
  population.innerHTML = data[0].population;
  region.innerHTML = data[0].region;
  subRegion.innerHTML = data[0].subregion;
  capital.innerHTML = data[0].capital[0];
  domain.innerHTML = data[0].tld[0];
  currencies.innerHTML =data[0].currencies[Object.keys(data[0].currencies)[0]].name;
  languages.innerHTML = data[0].languages[Object.keys(data[0].languages)[0]];
};

// Call Api Get
GetApi();

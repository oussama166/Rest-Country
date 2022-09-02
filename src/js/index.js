// Variables
const country__section = document.querySelector(".country__section");
const DropDown = document.querySelector("select");
const search = document.querySelector(".search_btn");
const searchInput = document.querySelector("#search");
// Dark Mode
const SwticherColor = () => {
  const DarkMode = document.querySelector(".switcher__section input");

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //add this
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); //add this
    }
  }

  DarkMode.addEventListener("change", switchTheme, false);

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      DarkMode.checked = true;
    }
  }
};
//
// API CONTRY
const GetApi = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      CreationCrad(data);
      DropDown.addEventListener("click", () => {
        DropDown.addEventListener("click", filtrageCountry(), false);
      });
      search.addEventListener('click',()=> {
        if(searchInput.value.trim === ""){
          alert('Please fill the section');
        }
        else{
          SearchByName(SearchByName(searchInput.value));
        }
      });
      document.querySelectorAll('.country').forEach(elem=>{
        elem.addEventListener('click',()=>{
          idCountry(elem);
        })
      })
    });
};
// Generate card information
const CreationCrad = (data) => {
  for (let i = 0; i < data.length; i++) {
    // Create country Section
    let country = document.createElement("div");
    country.classList.add("country");
    // Create flag Section

    let flag = document.createElement("div");
    flag.classList.add("flag");
    let img = document.createElement("img");
    img.src = data[i].flags["png"];
    // Create country name Section

    let country__name = document.createElement("div");
    country__name.classList.add("country__name");
    let h1 = document.createElement("h1");
    h1.innerHTML = data[i].name["common"];
    // Create description Section

    let description = document.createElement("div");
    description.classList.add("description");
    // Create country__population section

    let country__population = document.createElement("h1");
    country__population.classList.add("country__population");
    let population = document.createElement("span");
    population.classList.add("population");
    population.innerHTML = data[i].population;
    country__population.innerHTML = `Population :`;
    country__population.appendChild(population);
    // Create Country Region

    let country__Region = document.createElement("h1");
    country__Region.classList.add("country__Region");
    let region = document.createElement("span");
    region.classList.add("region");
    region.innerHTML = data[i].region;
    country__Region.innerHTML = `Region :`;
    country__Region.appendChild(region);
    // Create Country Capital

    let country__Capital = document.createElement("h1");
    country__Capital.classList.add("country__capital");
    let capital = document.createElement("span");
    capital.classList.add("capital");
    capital.innerHTML = data[i].capital;
    country__Capital.innerHTML = `Capital :`;
    country__Capital.appendChild(capital);
    // Add Country population to description section (parent)

    description.appendChild(country__population);
    description.appendChild(country__Region);
    description.appendChild(country__Capital);
    // Add Section into the parent section

    country__name.appendChild(h1);
    flag.appendChild(img);
    country.appendChild(flag);
    country.appendChild(country__name);
    country.appendChild(description);
    country.setAttribute("data-id", i);
    country.setAttribute("data-region", data[i].region);
    country.setAttribute("data-name",data[i].name["common"]);
    country__section.appendChild(country);
  }
};
// Filtrage des region

const filtrageCountry = () => {
  const country = document.querySelectorAll(".country");
  let region = DropDown.value;
  for (let i = 0; i < country.length; i++) {
    if(region == country[i].dataset.region){
      continue;
    }
    else if(region == 'all'){
      country[i].classList.remove("hide__country");
    }
    else{
      country[i].classList.toggle("hide__country");
    }
  }
};

// Set Id of COUNTRY
const idCountry = (element)=>{
  localStorage.setItem("id", element.dataset.name);
  window.location.href = "../../detail.html";
}
GetApi();
SwticherColor();
export default SwticherColor;

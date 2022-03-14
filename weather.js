const form = document.querySelector("section.top-banner form");
const input = document.querySelector("div.container input");
const msg = document.querySelector("span.msg");
const cityList = document.querySelector(".ajax-section .cities");

localStorage.setItem("apikeyWhetaher", "0537372aba4139f7473dcfe1b09200a6");

form.addEventListener("submit", (e) => {
  getWeatherDataFromApi();

  e.preventDefault();
});
localStorage.setItem(
  "weatherApıHttp",
  "api.openweathermap.org/data/2.5/weather?q=London&appid=0537372aba4139f7473dcfe1b09200a6&umit=metric&lang=tr"
);
const getWeatherDataFromApi = async () => {
  let apiKey = localStorage.getItem("apikeyWhetaher");
  let inputVal = input.value;
  let units = "metric";
  let lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${units}&lang=${lang}`;

  try {
      
    const response = await axios(url)
    console.log(response.data)
    const{main, name,sys,weather} = response.data
    const iconUrl = `https://openweathermap.org/img/wn/${
        weather[0].icon}@2x.png`;

        let cityCarList = cityList.querySelectorAll(".city");
        let cityCarListArray = Array.from(cityCarList);
        if(cityCarListArray.length>0){
            const filter = cityCarListArray.filter(()=>{
                createdCityCardLi.querySelector(".city-name span").innerText==name 
                if(filter.length>0){
                    msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
                    form.reset();
                    input.focus();
                    ///return;
                }
            })
        }
    let createdCityCardLi = document.createElement("li");
    createdCityCardLi.className = "city";
    createdCityCardLi.innerHTML = `
    <h2 class="city-name" data-name="${name}, ${sys.country}">
    <span>${name}</span>
    <sup>TR</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
    <img class="city-icon" src="${iconUrl}">
    <figcaption>${weather[0].description}</figcaption>
    </figure>
`
   cityList.prepend(createdCityCardLi);
   form.reset();
   input.focus();


  } catch (error) {
      msg.innerText = error;
      
  }
};

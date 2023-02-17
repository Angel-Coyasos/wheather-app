console.log("Happy hacking :)");

const mount = document.querySelector("#mount");

const apiKey = "21a619bfc03f232f008272eebee0ecba";
const baseUrl = "https://api.openweathermap.org";
const city = document.querySelector("#city");

const button = document.querySelector("button[type='submit']");
button.addEventListener("click", () => {
  console.log(city.value);

  const apiUrl = `${baseUrl}/data/2.5/weather?q=${city.value}&appid=${apiKey}&lang=sp`;

  window
    .fetch(apiUrl)
    .then((respuesta) => respuesta.json())
    .then((weatherData) => {
      const { name, sys, main, weather, id } = weatherData;

      console.log(weatherData);
      console.log(apiUrl);

      /* 
        Contenedor Tarjeta
      */
      const card = document.createElement("div");
      card.className = "w-60 rounded-xl p-5 relative bg-emerald-600 hover:scale-105 hover:border hover:border-black hover:shadow-lg hover:shadow-emerald-700";

      /* 
        Seccion Ciudad y Pais
      */
      const city = document.createElement("h2");
      city.textContent = name;
      city.className = "text-center uppercase text-base font-bold text-slate-200";

      const country = document.createElement("span");
      country.textContent = sys.country;
      country.className = "ml-2 relative text-lg p-1 rounded-xl text-emerald-600 bg-slate-200";
      country.style = "top: -5px;";

      city.appendChild(country);

      /* 
        Seccion Temperatura Ciudad
      */
      const temp = document.createElement("h2");
      temp.textContent = Math.floor(main.temp -273.15) + " °C";
      temp.className = "font-black text-4xl text-center mt-5 text-slate-200";
      temp.style = "top: -5px;";

      /* 
        Seccion de descripcion dle clima
      */
      const desc = document.createElement("p");
      desc.textContent = weather[0].description;
      desc.className = "text-base text-right uppercase text-slate-200";
      desc.style = "top: -5px;";

      /* 
        Seccion Datos Extras del Clima
      */
      const data = document.createElement("div");
      data.className = "text-left mt-5 px-5 pt-1 border-t text-slate-200 border-slate-200";
      data.style = "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.1);";

      const extra = document.createElement("h3");
      extra.textContent =  "datos extras";
      extra.className = "text-center uppercase font-bold text-slate-200";
      extra.style = "top: -5px;";
      
      const tempMin = document.createElement("p");
      tempMin.textContent =  "temp max: " + Math.floor(main.temp_min -273.15) + " °C";
      tempMin.className = "text-base capitalize text-slate-200";
      tempMin.style = "top: -5px;";

      const tempMax = document.createElement("p");
      tempMax.textContent =  "temp max: " + Math.floor(main.temp_max -273.15) + " °C";
      tempMax.className = "text-base capitalize text-slate-200";
      tempMax.style = "top: -5px;";

      const humidity = document.createElement("p");
      humidity.textContent = "humidity: " + main.humidity + "%";
      humidity.className = "text-base capitalize text-slate-200";
      humidity.style = "top: -5px;";

      const wrapper = document.createElement("p");
      wrapper.textContent = "time: " + weather[0].main;
      wrapper.className = "text-base capitalize text-slate-200";
      wrapper.style = "top: -5px;";

      data.append( extra, wrapper, humidity, tempMin, tempMax )

      /* 
        Quitar Tarjeta
    */

        const close = document.createElement("p");
        close.textContent = "X";
        close.className = "font-bold absolute top-0 right-0 mt-1 mr-2 text-lg cursor-pointer text-slate-200";
        close.addEventListener( 'click', () => {
            card.remove();
        })

      /* 
        Agregamos todo a la tarjeta
      */
      card.append( close, city, temp, desc, data );

      /* 
        Agregamos todo al mount
      */
      mount.appendChild(card);

    });
});

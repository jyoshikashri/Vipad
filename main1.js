/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */ 
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*==========add blur header========*/
const blurHeader=()=>{
    const header=document.getElementById('header')
    //when scrol is greater than 50 viewport height,add or else remove
    this.scrolly>=50?header.classList.add('blur-header')
    :header.classList.remove('blur-header')
}
window.addEventListener('scroll',blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp=()=>{
    const scrollUp=document.getElementById('scroll-up')
    this.scrollY >= 350? scrollUp.classList.add('show-scroll')
                        :scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections=document.querySelectorAll('section[id]')

const scrollActive =()=>{
    const scrollDown=window.scrollY
    sections.forEach(current=>{
        const sectionHeight=current.offsetHeight,
              sectionTop=current.offsetTop-58,
              sectionId=current.getAttribute('id'),
              sectionsClass=document.querySelector('.nav__menu a[href*=' + sectionId +']')
              if(scrollDown>sectionTop && scrollDown<=sectionTop + sectionHeight)
                {
                    sectionsClass.classList.add('active-link')
                }
                else 
                {
                    sectionsClass.classList.remove('active-link')
                }
    })
}
window.addEventListener('scroll',scrollActive)



/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 2500,
    delay: 300,
    //reset: true,
});

// Example of different transitions

// From top to bottom
sr.reveal('.flood__img,.flood__data,.financial__data,.financial__img,.shelter__data,.shelter__img,.buildakit__data,.buildakit__img,.weather-container')
{
    origin: 'top'

}
sr.reveal('.home__data, .about__img, .about__data, .visit__data', {
    origin: 'top'
});

// From left to right
sr.reveal('.home__img', {
    origin: 'left'
});

// From bottom to top
sr.reveal('.home__footer', {
    scale: 1,
    origin: 'bottom'
});

// Individual elements with different origins
sr.reveal('.new__card:nth-child(1) img', {
    origin: 'left'
});
sr.reveal('.new__card:nth-child(2) img', {
    origin: 'bottom'
});
sr.reveal('.new__card:nth-child(3) img', {
    origin: 'right'
});

// No distance movement, just fading in
sr.reveal('.favorite__card img', {
    interval: 100,
    distance: 0
});

// No scaling, just fading in
sr.reveal('.footer__container img', {
    scale: 1
});


//nes and updates

document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');
    const apiKey = '0470ea32f9904eb69c20b6d4fa6d4f10'; // Replace with your news API key
    const apiUrl = `https://newsapi.org/v2/everything?q=floods OR earthquakes OR landslides OR drought OR tsunami&apiKey=${apiKey}`;
    app.use(crocs());

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const filteredArticles = articles.filter(article => {
                const title = article.title.toLowerCase();
                return title.includes('flood') || title.includes('earthquake') || title.includes('landslide') || title.includes('drought') || title.includes('tsunami');
            });

            filteredArticles.slice(0, 9).forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <img src="${article.urlToImage}" alt="${article.title}" class="news-image">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank" class="button">Read More</a>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});


//local alerts ----

document.addEventListener('DOMContentLoaded', function () {
    const weatherReport = document.getElementById('weather-report');
    const earthquakeReport = document.getElementById('earthquake-report');

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
                fetchEarthquakeData(lat, lon);
            }, error => {
                weatherReport.innerHTML = `<p>Error getting location: ${error.message}</p>`;
            });
        } else {
            weatherReport.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
        }
    }

    function fetchWeatherData(lat, lon) {
        const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=acffd5b1f69e46f892650825242006&q=${lat},${lon}&days=7`;

        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                const current = data.current;
                const forecast = data.forecast.forecastday;
                let weatherHTML = `
                    <h3>Weather Report</h3> 
                    <p>Current Temperature: ${current.temp_c}°C</p>
                    <p>Current Precipitation: ${current.precip_mm} mm</p>
                    <h3>7-Day Forecast:</h3>
                `;

                forecast.forEach(day => {
                    const iconFilename = day.day.condition.icon.split('/').pop(); // Get the icon filename
                    weatherHTML += `
                        <div class="forecast-day">
                            <img src="icons/${iconFilename}" alt="${day.day.condition.text}" class="weather-icon">
                            <p>${day.date}</p>
                            <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                            <p>Min Temp: ${day.day.mintemp_c}°C</p>
                            <p>Precipitation: ${day.day.totalprecip_mm} mm</p>
                        </div>
                    `;
                });

                weatherReport.innerHTML = weatherHTML;
            })
            .catch(error => {
                weatherReport.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }

    function fetchEarthquakeData(lat, lon) {
        const earthquakeApiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${lat}&longitude=${lon}&maxradiuskm=500&limit=5`;

        fetch(earthquakeApiUrl)
            .then(response => response.json())
            .then(data => {
                let earthquakeHTML = `<h3>Recent Earthquakes:</h3>`;

                if (data.features.length === 0) {
                    earthquakeHTML += '<p >No recent significant earthquakes in your area.</p>';
                } else {
                    data.features.forEach(quake => {
                        earthquakeHTML += `
                            <p><strong>Magnitude:</strong> ${quake.properties.mag}</p>
                            <p><strong>Location:</strong> ${quake.properties.place}</p>
                        `;
                    });
                }

                earthquakeReport.innerHTML = earthquakeHTML;
            })
            .catch(error => {
                earthquakeReport.innerHTML = `<p>Error fetching earthquake data: ${error.message}</p>`;
            });
    }

    // Call function to get user's location
    getUserLocation();
});




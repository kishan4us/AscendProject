<script>
const apiURL = import.meta.env.VITE_WEATHER_API_URL;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
// let city = 'gobardanga';
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return{
      weather: {},
      city: '',
      lastCity: '',
      hasData: true,
      hasSearched: false,
      active: false
    }
  },
  methods: {
    searchweather() {
      if (this.city === this.lastCity || !this.city) return;
      this.lastCity = this.city;
      fetch(`${apiURL}?q=${this.city}&appid=${apiKey}`).then((r) => r.json()).then(data => {
        console.log(data);
        this.hasSearched = true;
        if (data.cod == 200) {
          this.weather = data;
          this.weather.sunTime = (Math.random() * (11-0.1) + 0.1).toFixed(1);
          // this.weather.sunTime = (Math.random() * 10 + 0.1).toFixed(1);
          this.hasData = true;
        } else this.hasData = false;
      }).catch(e => { this.hasData = false; });
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    kToC(temp) {
      return (Math.round((temp - 273.15) * 100) / 100).toFixed(2);
    },
    kToF(temp) {
      return (Math.round(((temp - 273.15) * 9 / 5 + 32))*100/100).toFixed(2);
    },
    weatherIconURL(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }
  }
}

</script>

<template>
  <div id="app" class="container">
    <div class="px-3 py-1 bg-gradient-dark text-white">
      <h4 class="text-white apptitle">{{msg}}</h4>
    </div>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-sm-12 col-xs-12"> 
              <div class="px-4 pb-2">
                <div class="input-group justify-content-center">
                <div class="form-outline">
                  <input type="search" v-model="city" class="form-control" @keyup.enter="searchweather" placeholder="Enter city name" />
                </div>
                <button type="submit" class="btn btn-primary" @click="searchweather">
                  <i class="fa fa-search" style="color:white"> </i>
                </button>
              </div>
              </div>
            </div>
          </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-12 col-sm-12 col-xs-12" v-if="active"> 
                <div class="card p-4" v-if="hasData && hasSearched">    
                    <div class="d-flex">
                        <h6 class="flex-grow-1 text-dark">
                          <i class="fa fa-solid fa-location-dot text-danger"></i>&nbsp;{{weather.name}}, {{toTitleCase(weather.sys.country)}}
                        </h6>
                        <h6>{{(new Date()).toLocaleTimeString()}}</h6>
                      </div>
                      <div class="text-success">
                        <div style="font-size:12px">
                          <i class="fa fa-duotone fa-calendar-days text-primary"></i>
                          &nbsp;{{(new Date()).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}}
                        </div>
                        <div style="font-size:12px">
                          <i class="fa fa-duotone fa-location-crosshairs text-primary"></i>
                          Lon: {{weather.coord.lon}}, Lat: {{weather.coord.lat}}
                        </div>
                      </div>
                    
                    <div class="d-flex flex-column temp mt-3 mb-1">
                        <h1 class="mb-0 font-weight-bold text-dark" >
                          <i class="fa fa-thin fa-temperature-three-quarters text-info"></i>
                          {{kToC(weather.main.temp)}}&deg; C 
                          </h1>
                        <span class="small text-primary">{{(weather.main.pressure*0.0145037738).toFixed(2)}} psi</span>
                        <!-- <span class="small text-info">{{kToF(weather.main.temp)}}&deg; F</span> -->
                    </div>
                    
                    <div class="d-flex">
                        <div class="temp-details flex-grow-1">
                            <p class="my-1">
                              <i class="fa fa-duotone fa-wind text-primary"></i>
                                <span> &nbsp;{{weather.wind.speed}} km/h  </span>
                            </p>

                            <p class="my-1"> 
                                <i class="fa fa-tint mr-2 text-primary" aria-hidden="true"></i>
                                <span>&nbsp; {{weather.main.humidity}} % </span> 
                            </p>

                            <p class="my-1"> 
                              <i class="fa fa-duotone fa-sun text-primary"></i>
                                <span>&nbsp;{{weather.sunTime}} h </span>
                            </p>
                        </div>
                        
                        <div>
                          <div class="d-flex justify-content-center p-0 m-0">
                            <img  v-bind:src=weatherIconURL(weather.weather[0].icon) width="60">
                          </div>
                          <div class="d-flex justify-content-center p-0 m-0">
                            <div class="small text-primary">{{toTitleCase(weather.weather[0].description)}}</div>
                          </div>
                        </div>
                    </div>
                    
      
                </div>
                <div class="card p-4 text-danger text-center small" v-if="!hasData && hasSearched">City Not Found</div>
            </div>
        </div>


    </div>

  </div>
</template>

<style scoped>

</style>


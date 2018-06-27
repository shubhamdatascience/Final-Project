import { Component } from '@angular/core';
// import * as $ from 'jquery';

const baseUrl="http://localhost:3000/";

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent {
  cards = [
      { title: 'Country with maximum number of Tweets is ...',name:localStorage.getItem("cards"), cols: 2, rows: 1.5},
    ];
  flightInfo=JSON.parse(localStorage.getItem("flights"))
  public bookFlights(){
      var flightInfo=[];
      $(function () {
          $.get(baseUrl+"sabre/start",function (response) {
                if(response.success) {
                  response.data.map(function(flight){
                    flightInfo.push({ title: 'Flight Origin: '+ flight.OriginLocation+'',departure:"Departure: "+ flight.DepartureDateTime+"",arival:"Arival: "+ flight.ReturnDateTime+"",details:'Airline Code: '+ flight.LowestFare.AirlineCodes[0]+'',cost:'Fare: '+ flight.LowestFare.Fare+'', cols: 1, rows: 1})
                  })
                  localStorage.setItem("flights",JSON.stringify(flightInfo));
                   if(localStorage.getItem("flag")==null){
                     localStorage.setItem("flag", true);
                     location.reload();
                   }
                  console.log(flightInfo);
                } else {
                  console.log('Some problem with your api`s');
                }
          });
       }
    }
}

window.onload = () => {
  $(function () {
      $.get(baseUrl+"twitterstream/topCountry",function (response) {
            if(response.success) {
                 localStorage.setItem("cards", response.data.countryName.toUpperCase());
                  if(localStorage.getItem("flag")==null){
                    localStorage.setItem("flag", true);
                    location.reload();
                  }
            } else {
              console.log('Some problem with your api`s');
            }
      });
   }
   setTimeout(function(){
     localStorage.removeItem("flights");
     localStorage.removeItem("flag");
   }, 3000);
};

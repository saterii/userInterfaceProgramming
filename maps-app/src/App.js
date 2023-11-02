import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import * as L from "leaflet";
import axios from "axios";
import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [courses, setCourses] = useState([]) 
  const position = [62.241221, 25.759684]
  const zoom = 7
  useEffect(() => {
    axios
      .get('http://localhost:3001/courses')
      .then(response => {
        setCourses(response.data);
      })
  }, [])
  var myIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize:     [20, 30], // size of the icon
    iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [10, -30]
  })
  const markers = courses.map((course,index) =>
  <Marker position={[course.lat, course.lng]} key={index} icon={myIcon}>
    <Popup>
        <b>{course.course}</b><br/>
        {course.address}<br/>
        {course.phone}<br/>
        {course.email}<br/>
        <a href={course.web} target="_blank" rel="noopener noreferrer">{course.web}</a><br/>
        <br/>
        <i>{course.text}</i>
      </Popup>
  </Marker>
  );
  
  return (
    <div id="map" style={{overflow: "hidden"}}>
    <MapContainer center={position} zoom={zoom} className="App">
      
      {markers}
      <Marker position={position} icon={myIcon}>
      <Popup>
        <b>JAMK University of Applied Sciences</b><br/>
        <i>Dynamo building</i>
      </Popup>
      </Marker>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    </MapContainer>
    </div>
  );

}

export default App;

import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import mapStyles from "../mapStyles";

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 46.615493, lng: 16.542416 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 46.615493, lng: 16.542416 }} />
      )}
    </GoogleMap>
  ))
);
export default Map;

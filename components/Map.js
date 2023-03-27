import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from "tailwind-react-native-classnames";
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin} from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env";
import getPlaceId from './GoogleMapsUtils';




const MapViewComponent = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [originPlaceId, setOriginPlaceId] = useState(null);
  const [destinationPlaceId, setDestinationPlaceId] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], { edgePadding: {top: 50, right: 50, bottom: 50, left: 50 }});
  }, [origin, destination])

  useEffect(() => {
    const getDirections = async () => {
      if (origin && destination) {
        const originId = await getPlaceId(origin.location.lat, origin.location.lng);
        const destinationId = await getPlaceId(destination.location.lat, destination.location.lng);
        setOriginPlaceId("place_id:" + originId);
        setDestinationPlaceId("place_id:" + destinationId);
      }
    };
    getDirections();
  }, [origin, destination]);

  return (  
    <MapView 
    ref={mapRef}
      style={tw `flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
          <MapViewDirections 
            origin={originPlaceId}
            destination={destinationPlaceId}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"

          />
      )}

    {origin?.location && (
      <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Akshay's Origin"
          description={origin.location.lat + " " + origin.location.lng}
          identifier="origin"
      />
    )}

  {destination?.location && (
      <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Akshay's Destination"
          description={destination.location.lat + " " + destination.location.lng}
          identifier="origin"
      />
    )}
      </MapView>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
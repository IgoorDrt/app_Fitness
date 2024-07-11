import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
 
export default function MapScreen(){
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [route, setRoute] = useState(null);
 
  useEffect(() => {
    const startTracking = async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissões para acessar a localização foram negadas.');
        return;
      }
      try {
        await watchPositionAsync({
          accuracy: Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 50,
        }, (loc) => {
          setCurrentLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
        );
      } catch (err) {
        console.warn('Algo deu errado...')
      }
    }
    startTracking();
  }, []);
 
  const getDirections = (latitude, longitude) => {
    setDestinationLocation({
      latitude: latitude,
      longitude: longitude
    })
  }
 
  const calculateRoute = async () => {
    if (!currentLocation || !destinationLocation) return;
    const orsApiKey = '5b3ce3597851110001cf6248b43661771ae84e45b385b628a1fc4e14';
    const url = `https://api.openrouteservice.org/v2/directions/${orsApiKey}?start=${currentLocation.latitude},${currentLocation.longitude}&end=${destinationLocation.latitude},${destinationLocation.longitude}&profile=foot-walking`;
    const response = await fetch(url);
    const data = await response.json();
    const routeCoordinates = data.routes[0].geometry.coordinates;
    setRoute(routeCoordinates);
  }
 
  return (
<View>
<MapView
        style={{ flex: 1 }}
        region={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
>
        {currentLocation && (
<MapView.Marker
            coordinate={currentLocation}
            title="Current Location"
          />
        )}
        {destinationLocation && (
<MapView.Marker
            coordinate={destinationLocation}
            title="Destination"
          />
        )}
        {route && (
<MapView.Polyline
            coordinates={route}
            strokeColor="#4285F4"
            strokeWidth={3}
          />
        )}
</MapView>
<Text onPress={calculateRoute}>Get Directions</Text>
</View>
  );
};

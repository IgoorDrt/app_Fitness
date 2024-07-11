import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Localization from 'expo-localization';
 
const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [language, setLanguage] = useState(null);
 
  useEffect(() => {
    Localization.getLocalizationAsync().then((localization) => {
      setLocation(localization.region);
      setLanguage(localization.language);
    });
  }, []);
 
  return (
<View style={styles.container}>
<Text>Localização atual:</Text>
<Text>{location && `${location.city}, ${location.country}`}</Text>
<Text>Idioma:</Text>
<Text>{language && language.toUpperCase()}</Text>
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
export default LocationScreen;
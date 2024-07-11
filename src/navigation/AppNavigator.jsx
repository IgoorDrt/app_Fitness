import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import CalendarScreen from "../screens/Calendar";
import DocumentPickerScreen from "../screens/DocumentPickerScreen";
import MapScreen from "../screens/MapScreen";
import ExerciseHistoryScreen from "../screens/ExerciseHistoryScreen";
import LocationScreen from "../screens/LocationScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen" // id da tela
        component={HomeScreen} // aqui é onde será exibido a tela do componente HomeScreen.jsx
        options={{
          title: "Home",
       
        }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          title: "Calendario",
          
        }}
      />
      <Tab.Screen
        name="DocumentPickerScreen"
        component={DocumentPickerScreen}
        options={{
          title: "Exames e resultados",
         
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Mapa",
         
        }}
      />
      <Tab.Screen
        name="ExerciseHistoryScreen"
        component={ExerciseHistoryScreen}
        options={{
          title: "Exercicios",
         
        }}
      />
      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          title: "Localizacao",
         
        }}
      />
    </Tab.Navigator>
  );
}
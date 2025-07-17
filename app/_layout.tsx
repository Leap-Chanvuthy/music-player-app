import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import './globals.css';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() =>{
    if (fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded])

  if (!fontsLoaded){
    return null;
  }
  return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Stack screenOptions={{headerShown : false}} />
      </PersistGate>
    </Provider>
  )
}

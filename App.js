import React, { useEffect,useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClaimMain from './src/screens/Claim/ClaimMain';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


// import CollectiblePage from './components/claim/CollectiblePage';
// import Profile from './components/profile/Profile';

// import useClevertap from './hooks/useClevertap';

const Stack = createStackNavigator();

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Satoshi': require('./assets/fonts/Satoshi-Medium.ttf'),
//   });
// };

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBn6Z25L5AQw8UFoIFdVqUneidEH_YX97E",
    authDomain: "asset-9c461.firebaseapp.com",
    projectId: "asset-9c461",
    storageBucket: "asset-9c461.appspot.com",
    messagingSenderId: "732725049341",
    appId: "1:732725049341:web:9fb93e2181606122df8b94",
    measurementId: "G-953Y53RR38",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // const { handleEventPushClick } = useClevertap();

  useEffect(() => {
    // Here we will implement logic related to page tracking
  }, []);

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //     />
  //   );
  // }


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClaimMain">
        <Stack.Screen name="ClaimMain" component={ClaimMain} />
        {/* <Stack.Screen
          name="Collectible"
          component={CollectiblePage}
        />
        <Stack.Screen
          name="Collectible Drops"
          component={CollectiblePage}
        />
        <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
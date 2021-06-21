import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Screen/Login';
import Signup from './src/Screen/Signup';
import { NavigationContainer } from '@react-navigation/native';
import DashBoard from './src/Screen/DashBoard';


const Stack = createStackNavigator();

export default function App() {
  const  isLogin = false;
  
  return (
    <NavigationContainer>
       <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}>
        {isLogin === false ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name="DashBoard" component={DashBoard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

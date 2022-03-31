import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import ResetPassword from './src/screens/ResetPassword';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import DetailSearch from './src/screens/DetailSearch';
import AddVehicles from './src/screens/AddVehicles';
import EditVehicle from './src/screens/EditVehicle';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailSearch"
          component={DetailSearch}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddVehicles"
          component={AddVehicles}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditVehicle"
          component={EditVehicle}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

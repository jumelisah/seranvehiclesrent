import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';
import Home from './Home';
import DetailSearch from './DetailSearch';
import AddVehicles from './AddVehicles';
import EditVehicle from './EditVehicle';
import EditProfile from './EditProfile';
import History from './History';
import {useSelector} from 'react-redux';
import ConfirmAccount from './ConfirmAccount';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        name="ConfirmAccount"
        component={ConfirmAccount}
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

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={DetailSearch} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MyTabs />
      <MainStack.Screen
        name="AddVehicles"
        component={AddVehicles}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="EditVehicle"
        component={EditVehicle}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

const Main = () => {
  const {auth} = useSelector(state => state);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth.token && (
          <Stack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{headerShown: false}}
          />
        )}
        {auth.token !== null && (
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

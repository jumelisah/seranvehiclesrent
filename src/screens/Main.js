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
import Profile from './Profile';
import History from './History';
import ChangePassword from './ChangePassword'
import {useSelector} from 'react-redux';
import ConfirmAccount from './ConfirmAccount';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#9AD0EC',
        tabBarActiveTintColor: '#1572A1',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => <Icon name="home" size={30} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={DetailSearch}
        options={{
          tabBarIcon: ({focused}) => <Icon name="search" size={30} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          pressColor: 'red',
          tabBarIcon: ({focused}) => <Icon name="list-alt" size={30} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => <Icon name="user" size={30} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{headerShown: false}}
      />
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
        name="ChangePassword"
        component={ChangePassword}
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
            name="MainStack"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

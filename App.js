import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ModalDemo from './Screens/loginModal';
import Home from './Screens/Home';
import CreateEmp from './Screens/CreateEmp';
import Profile from './Screens/Profile';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()
const myoptions = {
  title:"List of Employees",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#7bb8ed"
  }
}
function App() {
  return (
     <View style={styles.container}>
        <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
      options = {myoptions}
      />
      <Stack.Screen name="Create" component={CreateEmp} options={{...myoptions,title:"Create Employee"}} />
      <Stack.Screen name="Profile" component={Profile} options={{...myoptions,title :"Profile"}} />
    </Stack.Navigator>
       </View>
      
  );
}

export default () =>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbd5d5',
    
  },
});

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from './db';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

//adding new const for Authorization and Logging in + handles
const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useEffect(() => {
 return firebase.auth().onAuthStateChanged(setUser);
  }, []) ;
 
const handleRegister = async () => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  db.collection('users').doc(firebase.auth().currentUser.uid)
  .add({displayName: email, photoURL: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"})
};

const handleLogin = () => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else if(!user) {
    return(
      <View style={styles.container}>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setEmail} value={email} placeholder="Email"/>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setPassword} value={password} placeholder="Password"/>

      <Button title="Register" onPress={() => handleRegister()}></Button>
      <Button title="Login" onPress={() => handleLogin()}></Button>
      </View>
    );
    }
    else {
      console.log("user", user);
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

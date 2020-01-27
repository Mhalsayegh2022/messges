import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import db from '../db';

export default function SettingsScreen() {

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleSet = async () => {
    const info = await db.collection('users').doc(firebase.auth().currentUser.uid).get()
    setDisplayName(info.displayName);
    setPhotoURL(info.photoURL);
  };

  useEffect(() => {
    // setDisplayName(firebase.auth().currentUser.displayName);
    // setPhotoURL(firebase.auth().currentUser.photoURL);
    handleSet()
  }, []);

  const handleSave = () => {
    //firebase.auth().currentUser.updateProfile({displayName, photoURL})
    db.collection('users').doc(firebase.auth().currentUser.uid).set({displayName,photoURL});
  };
const handlePickImge= () => {
  //show camera roll, allow user to select, set photoURL
  //-use firebase storage
  //-upload selected image to default bucket, naming with uid
  //- use get the url and set the photoURL
}
  return (
    <View style={styles.StyleSheet}>

      <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setDisplayName}
        placeholder="DisplayName"
        value={displayName} />

      <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPhotoURL}
        placeholder="PhotoURL"
        value={photoURL} />

      <Button title="Save" onPress={() => handleSave()}></Button>

    </View>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


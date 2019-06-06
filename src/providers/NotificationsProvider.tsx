import firebase, { RNFirebase } from "react-native-firebase";
import React from "react";



export class NotificationService extends React.Component {

    private FCM = firebase.messaging();
    private ref = firebase.firestore().collection("users");

    public componentDidMount() {

        // check to make sure the user is authenticated  
        firebase.auth().onAuthStateChanged(user => {
            // requests permissions from the user
            this.FCM.requestPermission();
            // gets the device's push token
            this.FCM.getToken().then(token => {

                // stores the token in the user's document
                this.ref.doc('test').update({ pushToken: token })
            });

        });
    }
}
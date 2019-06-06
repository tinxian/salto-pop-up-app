import firebase from "react-native-firebase";

class NotificationService {
    public async initializeNotificationService() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // user has permissions
        } else {
            this.requestPermissions()
        }
    }

    private async requestPermissions() {
        try {
            await firebase.messaging().requestPermission()
            // User has authorised
        } catch (error) {
            // User has rejected permissions
        }
    }
}

export const Notifications = new NotificationService()
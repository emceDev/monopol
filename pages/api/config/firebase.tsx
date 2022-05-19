import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyA7YUDcXk7HGbKPKSl1uSsZE4r5N54eWXM",
	authDomain:"school-d95f0.firebaseapp.com",
	databaseURL: "https://school-d95f0-default-rtdb.firebaseio.com",
	projectId: "school-d95f0",
	storageBucket: "school-d95f0.appspot.com",
	messagingSenderId: "1048632052903",
	appId: "1:1048632052903:web:f209b15985c3e857dd5f82",
	measurementId: "G-1L0QDX6FMR",
};
export const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase;

// export const analytics = getAnalytics(app);
// 	APIKEY = "AIzaSyA7YUDcXk7HGbKPKSl1uSsZE4r5N54eWXM";
// AUTHDOMAIN = "school-d95f0.firebaseapp.com";
// DATABASEURL = "https://school-d95f0-default-rtdb.firebaseio.com";
// PROJECTID = "school-d95f0";
// STORAGEBUCKET = "school-d95f0.appspot.com";
// MESSAGINGSENDERID = "1048632052903";
// APPID = "1:1048632052903:web:f209b15985c3e857dd5f82";
// MEASURMENTID = "G-1L0QDX6FMR";

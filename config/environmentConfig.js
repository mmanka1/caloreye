var environments = {
	staging: {
		FIREBASE_API_KEY: "AIzaSyCaMwYff_-HW82QneFIU1DWZ5VKNL3jq9U",
		FIREBASE_AUTH_DOMAIN: "nutrition-analyzer-proj.firebaseapp.com",
		FIREBASE_PROJECT_ID: "nutrition-analyzer-proj",
		FIREBASE_STORAGE_BUCKET: "nutrition-analyzer-proj.appspot.com",
		FIREBASE_MESSAGING_SENDER_ID: "637581729734",
		GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyBdnSXgni4h0-4c_ZJQxhw5FDkW_vSNbiM"
	},
	production: {
		// Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
	}
};

function getReleaseChannel() {
	let releaseChannel = Expo.Constants.manifest.releaseChannel;
	if (releaseChannel === undefined) {
		return 'staging';
	} else if (releaseChannel === 'staging') {
		return 'staging';
	} else {
		return 'staging';
	}
}
function getEnvironment(env) {
	console.log('Release Channel: ', getReleaseChannel());
	return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
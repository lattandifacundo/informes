const firebase = require('firebase');

if(process.env.TOKEN == undefined){
    const dotenv = require('dotenv');
    dotenv.config();
}

firebase.initializeApp({
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DATABASEURL,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGINGSENDERID,
    appId: process.env.FB_APPID,
    measurementId: process.env.FB_MEASUREMENTID
});

async function read(key){
    var val;
    await firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASSWORD)
        .then(async () => {
            const snapshot = await firebase.database().ref(key).get();
            if (snapshot.exists()) {
                val = snapshot.val();
            }
            else{
                console.log("Error in read");
                process.exit(1);
            }
        });

    console.info("🔥 Firebase read");
    return val;
}

async function write(key, value){    
    await firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASSWORD)
        .then(async () => {
            await firebase.database().ref(key).set(value);
        });

    console.info("🔥 Firebase wrote");
}

exports.read = read;
exports.write = write;
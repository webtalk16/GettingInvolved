const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAppRole = functions.https.onCall((data, context) => {
    // check request is made by an owner
    if (context.auth.token.accessLevel.owner !== true) {
        return {
            message: 'error - only onwers can assign roles',
            errorCode: 'functions/error-owner-only'
        }
    }
    
    // get user and add custom claim (role)
    return admin.auth().getUserByEmail(data.email).then(user => {
        const objRole = {};
        objRole.accessLevel = {};
        objRole.accessLevel[data.type.toLowerCase()] = true;
        return admin.auth().setCustomUserClaims(user.uid, objRole);
    }).then(() => {
        // return response to user on the front end
        return {
            message: `Success! ${data.email} has been made ${data.type}`,
            successCode: `functions/success/addAppRole`
        };
    }).catch(err => {
        // return err;
        return {
            message: `Error creating ${data.type} - Error: ${err}`,
            errorCode: 'functions/error-role-create'
        }
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

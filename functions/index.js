const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // check request is made by an admin
    if (context.auth.token.admin !== true) {
        return {
            message: 'error - only admins can add other admins',
            errorCode: 'functions/error-admin-only'
        }
    }
    // get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        // return response to user on the front end
        return {
            message: `Success! ${data.email} has been made an admin`,
            successCode: `functions/success/addAdminRole`
        };
    }).catch(err => {
        // return err;
        return {
            message: `Error creating admin - Error: ${err}`,
            errorCode: 'functions/error-admin-create'
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

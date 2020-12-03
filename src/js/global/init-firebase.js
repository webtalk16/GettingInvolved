import { Config } from './config.js';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

class Firebase {
    constructor () {
        this.database = null;
        this.rootRef = null;
        this.firebaseConfig = Config.firebaseConfig.get.call();
    }

    initFirebase () {
        const that = this;

        // Initialize Firebase
        const app = firebase.initializeApp(this.firebaseConfig);
        // console.log(firebase);
        // firebase.analytics();

        this.database = firebase.database();
        this.rootRef = this.database.ref();

        // console.log("----database---");
        // console.log(this.database);
        // console.log("----database---");

        // const dataRef = this.database.ref('test1');

        // dataRef.once('value').then(function(snapshot) {

        //     // console.log("----snapshot---");
        //     // console.log(snapshot.val());
        //     // console.log("----snapshot---");

        //     dataRef.child('tests').once('value').then(function(snapshotChild) {
        //         let val = snapshotChild.val();
        //         if (!val) {
        //             val = 0;
        //         }
        //         // console.log("snapshotChild " + val);
        //         const newKey = 'testChild' + (val + 1);
        //         const newVal = val + 1;
        //         // dataRef.set({'testChild': newVal}).then().catch();
        //         that.database.ref('test1/tests').set(newVal);

        //         that.writeUserData(newKey, newVal);
        //         that.writeNewPost('sampleUid' + newVal, 'testUser' + newVal, 'New Post Title')
        //         that.readData('/posts');
        //         that.orderByKey('/posts');
        //         that.orderByChild('/posts', 'author');
        //     });

        //     // this.delete(dataRef.child('testChild'));
        // });

        //Delete ALL
        // this.delete(this.rootRef);
        
    }

    // ***** Notes *****
    // Use update to change/add multiple areas of tree that is linked to each other
    // using 1 write command so that if one fails the other will as well.
    // -- var updates = {};
    // -- updates['/posts/' + newPostKey] = postData;
    // -- updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    // -- return firebase.database().ref().update(updates);
    // As opossed to:
    // -- firebase.database().ref().child('/posts/' + newPostKey).set(postData);
    // -- firebase.database().ref().child('/user-posts/' + uid + '/' + newPostKey).set(postData);

    addItemByKey (parentRef, childName) {
        const newItemKey = parentRef.child(childName).push().key;
        return newItemKey;
    }

    // Update/Add specific data Without changing/deleting other data in tree location
    updateAdd (ref, updates, message) {
        ref.update(updates)
            .then(() => {
                console.log('updated ' + message + ' successfully');
            });
    }

    // Add/Replace data after Deleting all previous data in that location
    overwrite (ref, newData, message) {
        ref.set(newData)
            .then(() => {
                console.log('successfully overwriting node data - ' + message);
            });
    }

    // to read data, listen for updates "once" or continuesly using "on"
    readData (path) {
        const dataRef = this.database.ref(path);
        dataRef.once('value', (snapshot) => {
            console.log('read success, obj below');
            console.log(snapshot.val());
        }, (objError) => {
            console.log('The read failed ' + objError.code);
        });
        // Todo = retrun snapshot val to invoker
    }
    
    // retrieve/read results in ordered format by key
    orderByKey (path) {
        const dataRef = this.database.ref(path);
        dataRef.orderByKey().on('child_added', (snapshot) => {
            // will print for each item in path
            console.log(snapshot.key);
        });
    }

    // retrieve/read results ordered by field value within node
    orderByChild (path, orderBy) {
        const dataRef = this.database.ref(path);
        dataRef.orderByChild(orderBy).on('child_added', (snapshot) => {
            // will print for each item in path
            console.log(snapshot.val()[orderBy]);
        });
    }

    delete (dataRef) {
        dataRef.remove();
    }

    writeUserData(newKey, newVal) {
        const data = {
            name: newKey,
            val: newVal
        };
        const userRef =  this.database.ref('test1/' + newKey);
        const message = 'new user added with id ' + newKey;
        this.overwrite(userRef, data, message);
    }

    // TODO - create triggers to update/delete data that is linked to other parts of tree
    // (cloud functions listening to value changes)

    writeNewPost(uid, username, title) {
        const addPostRef = this.rootRef;
        
        // TODO - create data model
        const postData = {
            author: username,
            uid: uid,
            title: title
        };

        // add item to db with auto gen key
        const newPostKey = this.addItemByKey(addPostRef, 'posts');
        
        const updates = {};
        updates['/posts/' + newPostKey] = postData;

        const itemMessage = 'post ' + newPostKey;
        
        this.updateAdd(addPostRef, updates, itemMessage);
    }

    // TODO - use transactions to execute reads and writes as atomic units
    // meaning write based on the results of a read
    // -- this.database.ref('/posts/' + 'postID').transaction((post) => {
    // --     if (post) {
    // --         post.starCount = post.starCount + 1; // <--- read then write
    // --     }
    // --     return post;
    // -- });
}
  
export { Firebase };
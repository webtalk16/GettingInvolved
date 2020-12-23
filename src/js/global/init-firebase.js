import { Config } from './config.js';
import { Login } from '../components/login.js';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";
import { DateModel } from '../data/data-model.js';

class Firebase {
    constructor (global) {
        this.name = 'Firebase';
        this.global = global;
        this.database = null;
        this.storage = null;
        this.dataRoot = null;
        this.storageRoot = null;
        this.firebaseConfig = Config.firebase.firebaseConfig.get.call();
        this.firebase = firebase;
    }

    init () {
        const that = this;

        // console.log('modules')
        // console.log(this.global.modules)

        // Initialize Firebase
        const app = firebase.initializeApp(this.firebaseConfig);
        this.storage = firebase.storage();
        this.database = firebase.database();
        this.global.functions = firebase.functions();
        // console.log(firebase);
        // firebase.analytics();

        this.dataRoot = this.database.ref();
        this.storageRoot = this.storage.ref();
        // this.createDataStructure();

        this.global.addModule(Login);

        firebase.auth().onAuthStateChanged(function(user) {

            //that.global.getUser()
            if (user) {
                // check user claims (roles)
                user.getIdTokenResult().then(getIdTokenResult => {
                    console.log('User is Now signed in');

                    // console.log('---- claim logs ----');
                    // console.log(getIdTokenResult.claims.admin);
                    // console.log(getIdTokenResult.claims)
                    // console.log('---- claim logs ----');

                    let providerData = null;
                    if (user.providerData && user.providerData.length) {
                        user.providerData[0].admin = getIdTokenResult.claims.admin;
                        providerData = user.providerData[0];
                    }
                    
                    // console.log('--- obj User ---');
                    // console.log(providerData);
                    // console.log('--- obj User ---');
                    
                    that.global.setUser(providerData);
                    that.global.relayEvent(that.global.references.Events.userStateChangd);
                });
            }
            else {
                console.log('User is Now signed out');
                that.global.setUser(null);
                that.global.relayEvent(that.global.references.Events.userStateChangd);
            }
        });
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
    readData (path, callback) {
        const dataRef = this.database.ref(path);
        dataRef.once('value', (snapshot) => {
            console.log('read success');
            // console.log(snapshot.val());
            // return snapshot.val();

            if (callback && typeof callback == 'function') {
                // setTimeout(function () { //// TEMP test slow internet / response time
                callback(snapshot.val());
                // }, 5000);
            }

        }, (objError) => {
            console.log('The read failed ' + objError.code);
            // return null;
        });
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
        const addPostRef = this.dataRoot;
        
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

        const message = 'post ' + newPostKey;
        
        this.updateAdd(addPostRef, updates, message);
    }

    addNewVideo(dataObj, inputCoverImage) {
        // TODO - Adds video to the end - change order
        
        const addPostRef = this.dataRoot;
        const newVideoKey = this.addItemByKey(addPostRef, 'Videos');
        const videoData = new DateModel.Video(newVideoKey, dataObj);
        const message = 'new video ' + newVideoKey;
        const updates = {};
        
        this.storageUploadVideoCover(inputCoverImage, newVideoKey, () => {
            updates['/Videos/' + newVideoKey] = videoData;
            this.updateAdd(addPostRef, updates, message);
            setTimeout(() => { this.global.relayEvent(this.global.references.Events.newVideoAdded); }, 0);
        });
    }

    handleFiles (inputFile) {
        return inputFile.files[0];
    }

    storageUploadVideoCover (imageFile, videoId, doVideoAdd) {
        // TEMP - manually update file !!!!
        // videoId = '-MOWbquUHcD-iaTjXUDr';
        // TEMP !!!!

        const image = this.handleFiles(imageFile);
        const metadata = {
            contentType: image.type,
            name: image.name,
            size: image.size,
            forVideoId: videoId
        };

        const ref = this.storageRoot.child('/public/videos/' + videoId + '/placeholder.jpg'); //' + image.name);
        ref.put(image, metadata).then(function (snapshot) {
            doVideoAdd();
            console.log('Uploaded image file for ' + videoId + ' successfully!');
            // console.log(snapshot);

            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // console.log('File available at', downloadURL);
            });
        }).catch(function (err) {
            console.log('Error in Uploading image file for ' + videoId + '. Error - ' + err);
        });
    }

    // TODO - use transactions to execute reads and writes as atomic units
    // meaning write based on the results of a read
    // -- this.database.ref('/posts/' + 'postID').transaction((post) => {
    // --     if (post) {
    // --         post.starCount = post.starCount + 1; // <--- read then write
    // --     }
    // --     return post;
    // -- });

    eventHandler (eventName) {
        switch (eventName) {
            case this.global.references.Events.userStateChangd:
            case this.global.references.Events.updateUserItems:
                this.showHideData();
                break;
            default:
                break;
        }
    }
    
    showHideData () {
        // show/hide admin only elements
        const user = this.global.getUser();
        const adminOnlyItems = document.querySelectorAll('.adminOnly');
        adminOnlyItems.forEach(item => {
            if (user) {
                if (user.admin) {
                    item.classList.remove('hidden');
                }
                else {
                    item.classList.add('hidden');
                }
            }
            else {
                item.classList.add('hidden');
            }
        });
    }

    createDataStructure () {
        // upload videos from JSON
        // for (let prop in Videos) {
        //     this.addNewVideo(Videos[prop]);
        // }


        // console.log("----database---");
        // console.log(this.database);
        // console.log("----database---");

        // TEST !!!!!!!!!!!!!!!!!!!


        // this.dataRef.once('value').then(function(snapshot) {

        //     // console.log("----snapshot---");
        //     // console.log(snapshot.val());
        //     // console.log("----snapshot---");

        //     // Create parent data if does not exist
        //     const parentItems = {};
        //     parentItems['/Videos/'] = {};
        //     parentItems['/Posts/'] = {};
        //     const itemMessage = 'data parent items';
        //     this.updateAdd(this.dataRef, updates, itemMessage);

        //     // this.dataRef.child('tests').once('value').then(function(snapshotChild) {
        //     //     let val = snapshotChild.val();
        //     //     if (!val) {
        //     //         val = 0;
        //     //     }
        //     //     // console.log("snapshotChild " + val);
        //     //     const newKey = 'testChild' + (val + 1);
        //     //     const newVal = val + 1;
        //     //     // dataRef.set({'testChild': newVal}).then().catch();
        //     //     that.database.ref('test1/tests').set(newVal);

        //     //     that.writeUserData(newKey, newVal);
        //     //     that.writeNewPost('sampleUid' + newVal, 'testUser' + newVal, 'New Post Title')
        //     //     that.readData('/posts');
        //     //     that.orderByKey('/posts');
        //     //     that.orderByChild('/posts', 'author');
        //     // });

        //     // this.delete(dataRef.child('testChild'));
        // });

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
        // this.delete(this.dataRoot);
    }
}
  
export { Firebase };
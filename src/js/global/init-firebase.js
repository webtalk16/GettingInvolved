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
        this.global.retrievedData = new DateModel.RetrievedData();
        this.database = null;
        this.storage = null;
        this.dataRoot = null;
        this.storageRoot = null;
        this.firebaseConfig = this.global.config.firebase.firebaseConfig.get.call();
        this.firebase = firebase;
    }

    init () {
        const that = this;

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
                        user.providerData[0].accessLevel = getIdTokenResult.claims.accessLevel;
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

    delete (dataRef, callback) {
        dataRef.remove()
            .then(function() {
                console.log("Delete succeeded");
                if (callback && typeof callback === 'function') { callback(); }
            })
            .catch(function(error) {
                console.log("Delete failed: " + error.message)
            });
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

    deleteVideo (videoId) {
        const that = this;
        const videoData = this.global.retrievedData.videos.featuredVideos[videoId];
        
        const updates = {};
        updates['/Deleted/Videos/' + videoId] = videoData;
        const message = 'deleted video ' + videoId;
        this.updateAdd(this.dataRoot, updates, message);

        this.storageDeleteRecoverVideoCover(videoId);

        const afterDelete = () => {
            that.global.retrievedData.recentlyDeleted.videos[videoId] = videoData;
            setTimeout(() => { that.global.relayEvent(that.global.references.Events.videoDeleted); }, 0);
        };
        
        const deleteRef = this.dataRoot.child('/Videos/' + videoId);
        this.delete(deleteRef, afterDelete);
    }

    addEditVideo(dataObj, inputCoverImage, keepOriginalCover, isEdit, videoId, uploadDate, isRecover) {
        // TODO - Adds video to the end - change order
        
        const addVideoRef = this.dataRoot;
        const videoKey = isEdit ? videoId : this.addItemByKey(addVideoRef, 'Videos');
        const videoData = isRecover ? dataObj : new DateModel.Video(videoKey, uploadDate, dataObj);
        const message = 'new video ' + videoKey;
        const updates = {};

        const addVideo = () => {
            updates['/Videos/' + videoKey] = videoData;
            this.updateAdd(addVideoRef, updates, message);
            setTimeout(() => { this.global.relayEvent(this.global.references.Events.newVideoAdded); }, 0);
        };

        if (keepOriginalCover) {
            addVideo();
            if (isRecover) {
                this.storageDeleteRecoverVideoCover(videoId, isRecover);
            }
        }
        else {
            this.storageUploadVideoCover(inputCoverImage, videoKey, () => {
                addVideo();
            });
        }
    }

    tempAddItem (videoId) {
        // const uploadDate = (new Date()).getTime();
        // const addPostRef = this.dataRoot;
        // const updates = {};
        // updates['/Videos/' + videoId + '/uploadDate'] = uploadDate;
        // const message = 'new temp Item added: ' + '/Videos/' + videoId + '/uploadDate/' + uploadDate;

        // this.updateAdd(addPostRef, updates, message);
    }

    handleFiles (inputFile) {
        return inputFile.files[0];
    }

    storageDeleteRecoverVideoCover (videoId, isRecover) {
        // mark metadata as Deleted
        const isDeleted = isRecover ? null : true;
        const updtedmetadata = {
            customMetadata: {
                isDeleted: isDeleted,
                forVideoId: videoId
            }
        };
        const message = 'isDeleted';
        const imageRef = this.storageRoot.child('/public/videos/' + videoId + '/placeholder.jpg');
        this.storageUpdateMetaData(imageRef, updtedmetadata, message);
    }

    storageUpdateMetaData (ref, updtedmetadata, message) {
        ref.updateMetadata(updtedmetadata).then(function(metadata) {
            console.log(`Successfully updated the storage file's ${message} metadata`);
            console.log(metadata);
        }).catch(function(error) {
            console.log(`There was an error in updating the storage file's ${message} metadata - Error ${error}`);
        });
    }

    storageUploadVideoCover (inputImage, videoId, doVideoAdd) {
        // TODO - new image only shows after refresh - need to wait or clear cache

        const image = this.handleFiles(inputImage);
        const metadata = {
            customMetadata: {
                contentType: image.type,
                name: image.name,
                size: image.size,
                forVideoId: videoId
            }
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
                if (user.accessLevel && (user.accessLevel.admin || user.accessLevel.owner)) {
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

        const ownerOnlyItems = document.querySelectorAll('.ownerOnly');
        ownerOnlyItems.forEach(item => {
            if (user) {
                if (user.accessLevel && user.accessLevel.owner) {
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

        const loggedinOnlyItems = document.querySelectorAll('.loggedinOnly');
        loggedinOnlyItems.forEach(item => {
            if (user) {
                item.classList.remove('hidden');
            }
            else {
                item.classList.add('hidden');
            }
        });
    }

    createDataStructure () {
        // upload videos from JSON
        // for (let prop in Videos) {
        //     this.addEditVideo(Videos[prop]);
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
import localforage from 'localforage';

import 'whatwg-fetch';


/** HELPER FUNCTIONS */

// Use with generateGUID function to make random int
function genString() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// For generating unique ID
function generateGUID() {
    return (
        genString()
        + genString()
        + "-"
        + genString()
        + "-4"
        + genString().substr(0,3)
        + "-"
        + genString()
        + "-"
        + genString()
        + genString()
        + genString()
    ).toLowerCase();
}

// Converts blob string to a blob file
// Taken from https://ourcodeworld.com/
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

/* end HELPER FUNCTIONS */



/** function called in app to store catch data in localforage */
function storeCatch(data) {
    return new Promise((resolve, reject) => {
        localforage.setDriver(localforage.INDEXEDDB)
            .then(() => {
                // checks if an image was uploaded
                if (data.image !== null) {
                    const imageUpload = data.image

                    console.log('save q - imageUpload: ', imageUpload)

                    // for converting image to blob string setup
                    let reader = new FileReader();
                    reader.readAsDataURL(imageUpload);


                    const photoID = generateGUID(); // generate id for the photo
                    data.image = photoID;           // put it in the dictionary


                    // store actual image in localForage
                    reader.onloadend = () => {
                        localforage.setItem(photoID, reader.result)    // reader.result is the blob string
                            .then(r => { console.log('localstorage - photo saved!') })
                            .catch(e => reject(e))
                    };

                }
                else {
                    // no image
                }


                // storing the catch data in localforage in a queue
                let catches = []

                // get the key first
                localforage.getItem('catches')
                    .then(q => { // queue

                        // if there is anything in 'catches' we will push to it
                        if (q !== null) {
                            catches = q;
                        }

                        catches.push(data);

                        // clear localforage catches
                        localforage.setItem('catches', catches)
                            .then(r => resolve(r))
                            .catch(e => reject(e))
                    })
                    .catch(e => reject(e))
            })
    });
}


// /** function called in app to see if existing catch data in localforage */
// function checkQueue() {
//     let queued = false
//
//     localforage.setDriver(localforage.INDEXEDDB)
//         .then(() => {
//             localforage.getItem('catches')
//                 .then(q => { // queue
//                     if (q !== null) {
//                         queued = true
//                     }
//                 })
//                 .catch(e => { console.error(`localforage - failed to check queue for catches catches: ${e}`) })
//         });
//
//
//     return queued
// }

// function getQueue() {
//     let queue = []
//
//     localforage.setDriver(localforage.INDEXEDDB)
//         .then(() => {
//             localforage.getItem('catches')
//                 .then(q => { // queue
//                     if (q !== null) {
//                         queue = q
//                     }
//                 })
//                 .catch(e => { console.error(`localforage - failed to check queue for catches catches: ${e}`) })
//         });
//
//     return queue
// }
//
//
// /**
//  * function called in app to retrieve catch data from localforage
//  *  & post it to grails
//  */
// function submitQueue() {
//
// }


export default { storeCatch}//, checkQueue, getQueue, submitQueue }

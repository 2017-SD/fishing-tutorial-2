import localforage from 'localforage';

import print from '../util/Print'

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


/** submits one at a time */
function submitHelper(item) {
    const url = "/catch/newCatch";
    let formDat = new FormData();

    // if there is a photo
    if (item.image !== null) {
        // This is getting the photo of the catch out of localforage
        // it then makes a promise in which the fetch is called after
        // it is full filled
        localforage.getItem(item.image,
            (err, data) => {
                // convert the blob string back to an appropriate file
                let block = data.split(";");
                let contentType = block[0].split(":")[1];
                let realData = block[1].split(",")[1];
                let image = b64toBlob(realData, contentType);


                item.image = image

                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        formDat.append(key, item[key])
                    }
                }

            })
            .then(() => {
                fetch(url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: formDat
                })
                    .then(r =>  {
                        print("Store.submitHelper", r.status)
                    })


                localforage.removeItem(item.image);
            });
    }
    else {
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                formDat.append(key, item[key])
            }
        }

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: formDat
        })
            .then(r =>  {
                print("Store.submitHelper", r.status)
            })
    }
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

                    //console.log('save q - imageUpload: ', imageUpload)

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


/** gets current queue from localforage */
function getQueue() {
    return new Promise((resolve, reject) => {
        localforage.setDriver(localforage.INDEXEDDB)
            .then(() => {
                localforage.getItem('catches')
                    .then(q => { // queue
                        resolve(q)
                    })
                    .catch(e => { reject(e) })
            });
    })
}


/**
 * function called in app to retrieve catch data from localforage
 *  & post it to grails
 */
function submitQueue() {
    return new Promise((resolve, reject) => {
        localforage.setDriver(localforage.INDEXEDDB).then(() => {
            localforage.getItem('catches')
                .then(q => {

                    if (q == null)
                        return

                    let i = 0

                    for (i; i < q.length; i++) {
                        if (q[i] == null)
                            continue

                        submitHelper(q[i])
                    }

                    // after all items in the queue are submitted, remove them
                    localforage.removeItem('catches')
                        .then(() => {
                            alert('queue upload success!')
                        })
                        .catch(e => { reject(e) })
                })
                .catch(e => { reject(e) })
        });
    })
}


export default { storeCatch, getQueue, submitQueue }

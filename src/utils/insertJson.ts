import firebase from "../lib/firebase";

const db = firebase.firestore();

export const addNewDoc = async (
    document: any, 
    collection: string
    ) => {
    const res = await db.collection(collection)
        .add(document);
    console.log("Added document with ID: ", res);
}

export const saveDoc = async (
    documentId: string,
    document: any,
    collection: string
    ) => {
    const res = await db.collection(collection)
        .doc(documentId)
        .set(document);
    console.log("Saved document with ID: ", res);
}

export const deleteDoc = async (
    documentId: string,
    collection: string,
    ) => {
    const res = await db.collection(collection)
        .doc(documentId)
        .delete();
    console.log("Deleted document with ID: ", res);
}
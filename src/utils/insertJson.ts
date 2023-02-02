import { timeStamp } from "console";
import firebase from "../lib/firebase";
import { SurveyAnswers } from "../types_interfaces/types";

const db = firebase.firestore();

const answersConverter = {
  toFirestore(answers: SurveyAnswers): firebase.firestore.DocumentData {
    return {
      demographics: answers.demographics, 
      personality: answers.personality,
      self_determination: answers.self_determination,
      preferred_games: answers.preferred_games,
      suggestions: answers.suggestions,
      timestamp: answers.timestamp
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): SurveyAnswers {
    const data = snapshot.data(options)!;
    return {
      demographics: data.demographics,
      personality: data.personality,
      self_determination: data.self_determination,
      preferred_games: data.preferred_games,
      suggestions: data.suggestions,
      timestamp: data.timestamp
    }
  }
}

export const addNewDoc = async (
  document: any,
  collection: string,
) => {
  const res = await db.collection(collection)
    .add(document);
  console.log("Added document with ID: ",res.id, res);
  return res.id
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

export const addNewAnswersDoc = async (
  document: any,
  collection: string,
) => {
  const res = await db.collection(collection)
    .withConverter(answersConverter)
    .add(document);
  // console.log("Added document with ID: ", res.id, res);
  return res.id
}

const getCollectionRef = (collectionName: string) =>
  db.collection(collectionName);

const getDocRef = async (collectionName: string, docName: string) =>
  getCollectionRef(collectionName).doc(docName);

export const getDoc = async (collectionName: string, docName: string) =>
  (await getDocRef(collectionName, docName)).get();


// export const answersSnap = db.collection('hexaco-tests')
//   .withConverter(answersConverter)
//   .doc("3KTlpGYXC4sOdATRsswj").get()

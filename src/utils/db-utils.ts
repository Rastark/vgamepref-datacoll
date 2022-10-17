import firebase from '../lib/firebase'; 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react';


export const addUser = async (authUser: any) => {
  const resp = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });
  return resp;
};

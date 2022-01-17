import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.type';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection("NewCollections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        //call is a blocking effect creator. This means that the saga will not continue to run to the next yield until the API call finishes. 
        //Once it’s finished, we yield put. put is dispatching a new action with the result from the previous yield. 

        yield put(fetchCollectionsSuccess(collectionsMap))
        //put is a non-blocking effect creator, so it dispatches an action (could be an action that triggers some other saga)
    }
    catch (err) {
        yield put(fetchCollectionsFailure(err.message))
    }


    // collectionRef.get().then((snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap))
    // }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
}
      


export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}
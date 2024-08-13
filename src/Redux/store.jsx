import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "./Reducers/RootReducer"
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from 'redux-firestore'

export const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    )
);
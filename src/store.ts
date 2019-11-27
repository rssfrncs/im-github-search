import { createStore, applyMiddleware, Dispatch } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer, State } from "./reducer";
import { Action } from "./actions";
import { rootSaga } from "./effects";

const persistConfig = {
  key: "root",
  storage
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore<any, Action, unknown, unknown>(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

export const useTypedSelector = useSelector as TypedUseSelectorHook<State>;

export const useTypedDispatch = useDispatch as () => Dispatch<Action>;

sagaMiddleware.run(rootSaga);

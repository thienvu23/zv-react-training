import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWhitelistFilter } from "redux-persist-transform-filter";

const sagaMiddleware = createSagaMiddleware();

const auth = createWhitelistFilter("auth", ["token"]);

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [auth],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: pReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

// store.subscribe(() => {
//   console.log("state", store.getState());
// });

export { store, persistor };

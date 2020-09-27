import storage from 'redux-persist/lib/storage';
export const persistConfigRoot = {
    key: 'root',
    storage: storage,

};

export const persistConfigToken = {
    ...persistConfigRoot,
    key:"registrationReducer",
    whitelist: [],


};



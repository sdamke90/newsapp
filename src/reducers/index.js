import { combineReducers } from 'redux';


const fetchNewsReducer = ( news = null , action) => {
    if(action.type === 'FETCH_NEWS'){
        return action.payload;
    }
    return news;
};

const setCountryReducer = (country = 'in', action) => {
    if(action.type === 'SET_COUNTRY'){
        console.log(action.payload);
        return action.payload;
    }
    return country;
}

export default combineReducers({
    news : fetchNewsReducer,
    country: setCountryReducer
});
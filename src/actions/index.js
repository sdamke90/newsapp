 import axios from 'axios';
 
 function urlMaker(parameters){
    const url = "https://newsapi.org/v2/top-headlines"
    const apiKey= "6b5aec1182c5445cb6bf7fdd20e161fa";
    const pageSize = 50;
    const params = {
        apiKey,
        pageSize,
        ...parameters
    }
    const request = {
        url,
        params
    }
    return(request);
 }


export const setCountry = (country) => {
    return {
        type: 'SET_COUNTRY',
        payload : country
    }
}

export const setCategory = (category, country) => {
    return function(dispatch) {
        const parameters ={
            category,
            country
        }
        dispatch(fetchNews(parameters));
    }
}

export const fetchNews = (parameters) => {
    return async function(dispatch) {
    const News = await axios(urlMaker(parameters));

    dispatch({
        type: 'FETCH_NEWS',
        payload: News
    });
  }
 }
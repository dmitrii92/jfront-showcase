import axios from 'axios';
import {Feature, FeatureCreate, FeatureSearchTemplate, FeatureUpdate} from "./FeatureInterface";
import {SearchRequest} from "./types";

const API_URL = 'http://vsmlapprfid1:8080/JepRiaShowcase/api';
const USER = 'nagornyys';
const PASSWORD = '123';

export const getFeature = (id?: string): Promise<Feature> => {
  const url = `${API_URL}/feature/${id}/`;
  axios.defaults.withCredentials = true;
  return axios
      .get(
          url,
          {auth: {username: `${USER}`, password: `${PASSWORD}`}}
      )
      .then(
          response => response.data
      )
      .catch(reason => {
        console.log(reason);
        return Promise.reject(reason);
      });
}

export const createFeature = (feature: FeatureCreate): Promise<Feature> => {
  const url = `${API_URL}/feature`;

  return new Promise<Feature>((resolve, reject) => {
    axios.post(
        url,
        feature,
        {
          auth: {username: `${USER}`, password: `${PASSWORD}`},
          headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
    ).then(response => {
      if (response.status === 201) {
        let location: string = response.headers['location'];
        console.log("location" + location);
        axios.get(
            location,
            {
              auth: {username: `${USER}`, password: `${PASSWORD}`},
              headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-Type': 'application/json;charset=utf-8'
              }
            }
        ).then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response);
          }
        }).catch(error => reject(error));
      } else {
        reject(response);
      }
    }).catch(error => reject(error));
  });
}

export const updateFeature = (featureId: string, feature: FeatureUpdate): Promise<Feature> => {
  const url = `${API_URL}/feature/${featureId}/`;

  return new Promise<Feature>((resolve, reject) => {
    axios.put(
        url,
        feature,
        {
          auth: {username: `${USER}`, password: `${PASSWORD}`},
          headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
    ).then(response => {
      if (response.status === 200) {
        resolve();
      } else {
        reject(response);
      }
    }).catch(error => reject(error));
  });
}

export const postSearchRequest = (searchRequest: SearchRequest<FeatureSearchTemplate>) => {
  const url = `${API_URL}/feature/search`;
  axios.defaults.withCredentials = true;
  console.log(searchRequest)
  return new Promise<string>((resolve, reject) => {
    axios.post(
        url,
        searchRequest,
        {
          auth: {username: `${USER}`, password: `${PASSWORD}`},
          headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
            'Cache-Control': 'no-cache'
          }
        }
    ).then(response => {
      if (response.status === 201) {
        let location: string = response.headers['location'];
        console.log(response)
        resolve(location.split('/').pop());
      } else {
        reject(response);
      }
    }).catch(error => reject(error));
  });
}

export const searchFeatures = (searchId: string, pageSize: number, page: number): Promise<Array<Feature>> => {
  const url = `${API_URL}/feature/search/${searchId}/resultset?pageSize=${pageSize}&page=${page}`;
  axios.defaults.withCredentials = true;
  return new Promise<Array<Feature>>((resolve, reject) => {
    axios.get(
        url,
        {
          auth: {username: `${USER}`, password: `${PASSWORD}`},
          headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
            'Cache-Control': 'no-cache'
          }
        }
    ).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else if (response.status === 204) {
        resolve([]);
      } else {
        reject(response);
      }
    }).catch(error => reject(error));
  });
}

export const getResultSetSize = (searchId: string): Promise<number> => {
  const url = `${API_URL}/feature/search/${searchId}/resultset-size`;
  axios.defaults.withCredentials = true;
  return new Promise<number>((resolve, reject) => {
    axios.get(
        url,
        {
          auth: {username: `${USER}`, password: `${PASSWORD}`},
          headers: {
            'Accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/json;charset=utf-8',
            'Cache-Control': 'no-cache'
          }
        }
    ).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => reject(error));
  });
}
import axios from 'axios';
import {Feature} from "./FeatureInterface";

const API_URL = 'http://vsmlapprfid1:8080/JepRiaShowcase/api';
const USER = 'user';
const PASSWORD = 'password';

export const getFeature = (id?: string): Promise<Feature> => {
  const url = `${API_URL}/feature/${id}/`;

  return axios
      .get(
          url,
          {auth: {username: `${USER}`, password: `${PASSWORD}`}}
      )
      .then(
          response => response.data
      );
}

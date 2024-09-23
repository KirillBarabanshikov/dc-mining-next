import axios from 'axios';

import { BASE_URL } from '../consts';

export const instance = axios.create({ baseURL: BASE_URL + '/api' });

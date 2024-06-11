import axios from 'axios';
import { axiosDefaults } from './defaults';

export const clientFetch = axios.create(axiosDefaults);

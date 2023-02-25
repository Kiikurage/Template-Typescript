import { createUserAPI } from './createUserAPI';

const HOST = 'http://localhost:3001/api';

export const API = {
    ...createUserAPI(HOST),
};

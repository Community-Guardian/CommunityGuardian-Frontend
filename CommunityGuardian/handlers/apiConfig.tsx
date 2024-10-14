// const BASE_URL = 'http://127.0.0.1:80';
const BASE_URL = 'http://192.168.0.105:80';
// const BASE_URL = 'http://lemur-neutral-subtly.ngrok-free.app';
// const BASE_URL = 'https://nrad8394.pythonanywhere.com';

export const GET_INDIVIDUAL_URL = `${BASE_URL}/individuals/pk`;
export const UPDATE_INDIVIDUAL_URL = `${BASE_URL}/individuals/pk/`;


export const SIGN_UP_URL = `${BASE_URL}/register/`;
export const REFRESH_TOKEN = `${BASE_URL}/token/refresh/`;
export const LOGIN_URL_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const GET_USER_URL = `${BASE_URL}/users/pk/`;
export const CREATE_EMERGENCY_CONTACT_URL =`${BASE_URL}/emergency-contacts/`;
export const GET_EMERGENCY_CONTACT_URL =`${BASE_URL}/emergency-contacts/`;
export const UPDATE_EMERGENCY_CONTACT_URL =`${BASE_URL}/emergency-contacts/{id}/`;
export const DELETE_EMERGENCY_CONTACT_URL =`${BASE_URL}/emergency-contacts/{id}/`;

export { BASE_URL }
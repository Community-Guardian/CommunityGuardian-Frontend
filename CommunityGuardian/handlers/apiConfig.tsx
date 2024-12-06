// const BASE_URL = 'http://127.0.0.1:80';
// const BASE_URL = 'http://172.16.105.74:8001';
const BASE_URL = 'http://192.168.210.84:80/';

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
export const CREATE_REPORT_URL = `${BASE_URL}/reports/`;
export const GET_REPORTS_URL = `${BASE_URL}/reports/`;
export const UPDATE_REPORT_URL = `${BASE_URL}/reports/{id}/`;
export const DELETE_REPORT_URL = `${BASE_URL}/reports/{id}/`;
// apiConfig.tsx
export const GET_POSTS_URL = `${BASE_URL}/posts/`;
export const GET_COMMENTS_URL = `${BASE_URL}/comments/`;
export const CREATE_COMMENT_URL = `${BASE_URL}/comments/`;
export const GET_REWARDS_URL = `${BASE_URL}/rewards/`;

export { BASE_URL }
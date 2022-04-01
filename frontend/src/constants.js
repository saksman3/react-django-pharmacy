export const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const ProductListURL = `${endpoint}/products/`;
export const CategoryListURL = `${endpoint}/categories/`
export const ItemDetailURL=`${endpoint}/products/`
export const ProfileURL = `${endpoint}/profile`;
export const token = window.localStorage.getItem('token');
export const updateProfileURL = `${endpoint}/update_profile/`;
export const ProfileImageUpdateURL = `${endpoint}/profile_image_update/`
export const OrdersURL = `${endpoint}/orders/`
export const header = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json'
}
export const formDataHeader = {
    Authorization: `Token ${token}`
}
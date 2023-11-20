import axios from 'axios';

export const HotelApi = axios.create({
    baseURL : "http://localhost:5050/api",
})
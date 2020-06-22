import axios from 'axios'



const instance = axios.create({
    baseURL: 'https://us-central1-saba-israel.cloudfunctions.net/webApi/api/v1'
})



export const interceptorsAxios = ({ getState }) => (next) => async (action) => {
    const token = getState().auth.token;
    instance.interceptors.request.use(
        (config) => {
            //console.log('token',token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        },
        (err) => {
            console.log(err);
        }
    )
    next(action);
}




export default instance;
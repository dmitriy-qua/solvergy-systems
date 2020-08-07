import axios from "axios";

//export const getBaseUrl = () => 'http://192.168.1.111:3000/v1/'
//export const getBaseUrl = () => 'http://192.168.88.240:3000/v1/'
export const getBaseUrl = () => 'http://api.solvergy.org:3000/v1/'

export const createAxiosInstance = async (withHeader = false, contentType = 'application/json') => {

    const AUTH_TOKEN = withHeader ? await getToken() : ""

    return axios.create({
            withCredentials: true,
            headers: {
                'Content-Type': contentType,
                'Authorization': AUTH_TOKEN,
                "Access-Control-Allow-Origin": "*",
            },
            baseURL: getBaseUrl(),
        }
    )
};

export const getToken = async () => {
    let user = await localStorage.getItem('user')
    const userData = JSON.parse(user).data
    return (userData && userData.token) ? userData.token : ''
}

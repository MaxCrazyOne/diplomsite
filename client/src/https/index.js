import axios from "axios";

const $host=axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const $cameraHost = axios.create({
    baseURL:process.env.REACT_APP_CAMERA_API_URL
})
const $detectionHost = axios.create({
    baseURL:process.env.REACT_APP_DETECTION_API_URL
})
const $authHost=axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $cameraHost,
    $detectionHost
}
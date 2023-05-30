import {$authHost, $cameraHost, $detectionHost} from "./index";
import jwt_decode from "jwt-decode"

export const getAllCams = async () => {
    try {
        const {data} = await $cameraHost.get("api/camera")

        return data
    } catch (e) {
        return alert("Сервер недоступен")
}
}
export const getParkingLoadCount = async (camera_id) =>{
    try {
        const {data} = await $detectionHost.get("api/last",{params:{camera_id}})
        return data
    } catch (e){
        return alert("Сервер недоступен")
    }

}

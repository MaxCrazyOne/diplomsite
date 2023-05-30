import React, {useContext, useRef, useState} from 'react';

import {Placemark} from "@pbe/react-yandex-maps";

import camIcon from "../assets/cam.png"
import CameraDialog from "../components/CameraDialog";
import {observer} from "mobx-react-lite";
import {getParkingLoadCount} from "../https/CameraAPI";
import {ZoomControl} from "@pbe/react-yandex-maps";
import {Context} from "../index";

const CameraOnMap=observer(({cam}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [freeLots, setFreeLots] = useState(null)
    const {map} =useContext(Context)
    let interval = useRef(null)
    const clickOnMap = () =>{
      setIsVisible(true)
    }
    const getFreeLots = (id) => {

        interval.current = setInterval(async () => {
            try {
                await getParkingLoadCount(id).then(data => {
                    console.log(data)
                    setFreeLots(data.free_lots)
                })
            } catch (e){
                return alert("Сервер не доступен")
            }


        }, 10000)

    }
    let zoom = null


if(map.zoom >= 9){getFreeLots(cam.id)}
    else {clearInterval(interval.current)}


    return(

        <div>
            <Placemark geometry={[cam.latitude,cam.longitude]} instanceRef={inst => inst?.events?.add('click', clickOnMap)}
                       options={{iconLayout:"default#image",iconImageHref:camIcon,iconImageSize:[30,30]

                       }}/>
            <CameraDialog cam = {cam} show={isVisible} onHide={()=> setIsVisible(false)}/>
        </div>

    );

});
export default CameraOnMap
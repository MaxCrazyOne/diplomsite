import {YMaps, Map, SearchControl} from "@pbe/react-yandex-maps";
import SetCamOnMap from "../scripts/SetCamOnMap";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";


const MapPage = () => {

    const {user,map} = useContext(Context)



    const [zoom, setZoom] = useState(0)

    useEffect(() => {
        console.log(zoom)
        map.setZoom(zoom)
    }, [zoom])

    return (

        <YMaps query={{apikey: "19061236-afdd-482c-b24e-b7a76d10564a"}}>
            <Map options={{
                copyrightProvidersVisible: false,
                copyrightLogoVisible: false,
                copyrightUaVisible: false
            }} defaultState={{center: [47.3, 39.7], zoom: 3, controls: []}}

                 width={"100%"}
                 height={"90vh"}
                 instanceRef={instance => instance?.events.add('boundschange', (e) => {
                     setZoom(e.get('newZoom'))
                 })}
            >
                <SearchControl options={{float: "right", provider: 'yandex#search'}}/>
                {user.isAuth ?
                    <SetCamOnMap/> : alert("Авторизуйтесь на сайте")
                }
            </Map>
        </YMaps>
    )
}

export default MapPage;
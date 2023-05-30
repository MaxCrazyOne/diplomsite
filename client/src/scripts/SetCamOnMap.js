import React, {useContext} from 'react';
import {Context} from "../index";
import CameraOnMap from "./CameraOnMap";
import {observer} from "mobx-react-lite";

const SetCamOnMap = () => {
   const {cam} = useContext(Context)



    return(
        cam.cams.map(cam =>
          <CameraOnMap key={cam.id} cam = {cam}/>
        )
    );
}
export default SetCamOnMap;
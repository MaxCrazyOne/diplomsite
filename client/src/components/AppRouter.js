import React, {useContext, useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {publicRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {getAllCams, getParkingLoadCount} from "../https/CameraAPI";
import {Spinner} from "react-bootstrap";

const AppRouter = () => {
    const {user,cam}=useContext(Context)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        try {
            getAllCams().then(data=>cam.setCams(data)).finally(()=>setLoading(false))
        }
        catch (e){
            return alert("Ceрвер не доступен")
        }


    },[])
    if (loading){
        return <Spinner animation={"grow"}/>
    }
    return (
        <Switch>
            {publicRoutes.map(({path,Component}) =>
                <Route key={path} path={path} component = {Component} exact/>
            )}
            <Redirect to={HOME_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;
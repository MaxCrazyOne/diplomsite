
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import {BrowserRouter} from "react-router-dom";
import MapPage from "./components/MapPage";
import {YMaps} from "@pbe/react-yandex-maps";
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./https/UserAPI";
import AppRouter from "./components/AppRouter";
import {Spinner} from "react-bootstrap";

const Application = () => (
    <YMaps query={{ lang: 'en_RU' }}></YMaps>
);


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)

    const acheck = async ()=>{
        await check().then(data=>{
            user.setUser(data)
            if(data){user.setIsAuth(true)}
        })
        // что то делать
    }
    useEffect(()=>{
        acheck().finally(()=> setLoading(false))
    },[])
    if (loading){
        return <Spinner animation={"grow"}/>
    }

  return (
    <BrowserRouter>
        <Application/>
        <NavBar/>
        <AppRouter/>
    </BrowserRouter>
  );
});

export default App;

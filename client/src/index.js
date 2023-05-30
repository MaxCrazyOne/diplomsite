import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import CamInfos from "./structures/CamInfos";
import UsersInfo from "./structures/UsersInfo";
import MapInfo from "./structures/MapInfo";

export const Context=createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        cam:new CamInfos(),
        user:new UsersInfo(),
        map:new MapInfo()
    }}>
        <App/>
    </Context.Provider>,
);



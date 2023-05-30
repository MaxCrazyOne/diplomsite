import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./components/Auth";
import App from "./App";
import MapPage from "./components/MapPage";


export const publicRoutes =[
    {
        path: HOME_ROUTE,
        Component: MapPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
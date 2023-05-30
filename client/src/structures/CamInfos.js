import {makeAutoObservable} from "mobx";
import camImg from "../assets/park.jpg"

export default class CamInfos {
    constructor() {
        this._cams = [
            {
                id:1,
                address: "ул.Нагибина, 6",
                longitude:47.23937,
                latitude:39.712974,
                parkingCount:15,
                img:camImg
            },
            {
                id:2,
                address: "ул.Какая-то, 4",
                longitude:59.869173,
                latitude:30.261845,
                parkingCount:7,
                img:"wec"
            },

        ]
        makeAutoObservable(this)
    }
    setCams(cams){
        this._cams = cams
    }
    get cams(){
        return this._cams
    }

}
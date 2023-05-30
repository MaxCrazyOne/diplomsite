import {makeAutoObservable} from "mobx";


export default class MapInfo {
    constructor() {
        this._zoom = null
        makeAutoObservable(this)
    }
    setZoom(cams){
        this._zoom = cams
    }
    get zoom(){
        return this._zoom
    }

}
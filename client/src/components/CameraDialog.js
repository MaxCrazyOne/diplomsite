import React, {useContext, useEffect, useRef, useState} from 'react';

import "../App.css"
import {Card, Modal, ModalBody} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getParkingLoadCount} from "../https/CameraAPI";
import {Context} from "../index";

const ParkCount = (mark_up) => {
    return JSON.parse(mark_up).length
}


const CameraDialog = ({show, onHide, cam}) => {
    const {user} = useContext(Context)
    let interval = useRef(null)
    const [freeLots, setFreeLots] = useState(null)
    const onHideHandler = () => {
        onHide()
        clearInterval(interval.current)

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

    useEffect(()=>{
        console.log(freeLots)
    },[freeLots])

    return (
        <Modal
            show={show}
            onShow={() => getFreeLots(cam.id)}
            onHide={onHideHandler}
            size="lg"
            centered
        >
            <ModalBody style={{width: 300, height: 450}}>
                <Card style={{height: 400}}>
                    <Card.Img variant="top" height="180px" src={cam.source}/>
                    <Card.Body>
                        <Card.Title>Информация</Card.Title>
                        <Card.Text>
                                <div> Адрес: {cam.address} </div>
                                <div> Кол-во парковочных мест: {ParkCount(cam.mark_up)}</div>
                            {user.isAuth ?
                                <div>Кол-во свободных мест: {freeLots !== null ? freeLots:"Loading..."}</div>
                                :
                                <div>Авторизуйтесь на сайте</div>
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </ModalBody>

        </Modal>
    );

}
export default CameraDialog
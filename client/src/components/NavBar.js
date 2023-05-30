import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {NavLink, useHistory} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const NavBar = observer(() => {

    const  {user}=useContext(Context)
    const history= useHistory()
    const logOut =()=>{
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" expand="lg" style={{height:"10vh"}}>
            <Container fluid>
                <NavLink style={{color:'white',textDecoration:"none"}} to={HOME_ROUTE}>ParkingService</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    {user.isAuth ?
                        <Nav className="ml-auto">
                            <Button variant={"outline-light"}  className="ms-2" onClick={()=>logOut()} >Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={()=>history.push(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
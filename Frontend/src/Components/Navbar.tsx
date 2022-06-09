import React from "react";
import { useAppSelector } from "../redux/hooks";
import "./style.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
const NavbarHome: React.FunctionComponent = () => {
    let email = useAppSelector(state => state.user.userInfo?.email);
    return (
        <>
            <div>
                <Navbar className="fixed-top opacity" collapseOnSelect expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand className={"aqua shadow"}href="/home">ParkingProj</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                {email ? <NavDropdown title={email} id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/auth/Logout">Log out</NavDropdown.Item>
                                    <NavDropdown.Item href="/home/PersonalPage ">My Account</NavDropdown.Item>
                                </NavDropdown> : <><Nav.Link href="/auth/login">Log In</Nav.Link>
                                    <Nav.Link href="/auth/register">Sign up</Nav.Link> </>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    );
};

export default NavbarHome;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router';

export default function Header() {
    const navigate = useNavigate();
    const user = localStorage.getItem("blog_user");

    const handleLogout = () => {
        localStorage.removeItem("blog_user");
        navigate("/login");
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="container">
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Blog App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                {!user ? (
                                    <>
                                        <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/add-post">Create Post</Nav.Link>
                                        <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

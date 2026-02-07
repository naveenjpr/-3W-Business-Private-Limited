import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

export default function Header() {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("blog_user");
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem("blog_user");
        navigate("/login");
    };

    return (
        <Navbar expand="lg" className="premium-navbar sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-premium">
                    BlogApp
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="nav-link-premium">Home</Nav.Link>

                        {!user ? (
                            <div className="d-flex align-items-center gap-3 ms-lg-3">
                                <Nav.Link as={Link} to="/login" className="nav-link-premium">Login</Nav.Link>
                                <Button as={Link} to="/register" className="btn-nav-primary">
                                    Sign Up
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-3 ms-lg-3">
                                <Nav.Link as={Link} to="/add-post" className="nav-link-premium">Create Post</Nav.Link>
                                <div className="d-flex align-items-center gap-2 px-3 py-1 bg-light rounded-pill">
                                    <small className="fw-bold">{user.firstName}</small>
                                    <Button
                                        variant="link"
                                        onClick={handleLogout}
                                        className="p-0 text-danger small text-decoration-none fw-medium"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


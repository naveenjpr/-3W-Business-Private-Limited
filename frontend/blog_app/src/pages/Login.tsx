import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "../Common/Header";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let obj = {
            Email: e.target.Email.value,
            password: e.target.password.value,
        };
        axios.post("https://3w-business-private-limited.onrender.com/api/backend/auth/login", obj)
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.msg || "Login successful");
                    // Store user data in localStorage
                    localStorage.setItem("blog_user", JSON.stringify(res.data.loginDataCheckEmail));
                    navigate("/");
                } else {
                    toast.error(res.data.msg || "Invalid credentials");
                }
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.msg || error.response?.data?.message || "Login failed. Please try again.";
                toast.error(errorMsg);
            });
    };
    return (
        <>
            <Header />

            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <h3 className="text-center mb-4">Login</h3>

                                <Form onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Button */}
                                    <Button
                                        variant="dark"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Login
                                    </Button>

                                    <p className="text-center mt-3 mb-0">
                                        Don’t have an account?{" "}
                                        <span className="text-primary cursor-pointer">
                                            <Link to="/register">
                                                Register
                                            </Link>
                                        </span>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

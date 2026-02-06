import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "../Common/Header";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let obj = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            Email: e.target.Email.value,
            password: e.target.password.value,
            gender: e.target.gender.value,
        };
        axios.post("https://3w-business-private-limited.onrender.com/api/backend/auth/register", obj)
            .then((res) => {
                if (res.data.status) {
                    toast.success(res.data.msg || "Sign up successful");
                    navigate("/login");
                } else {
                    toast.error(res.data.msg || "Sign up failed");
                }
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.message || error.response?.data?.msg || "Sign up failed. Please try again.";
                toast.error(errorMsg);
            });
    };


    return (
        <>
            <Header />

            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow">
                            <Card.Body>
                                <h3 className="text-center mb-4">Create Account</h3>

                                <Form onSubmit={handleSubmit}>
                                    {/* First Name */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                        />
                                    </Form.Group>

                                    {/* Last Name */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                        />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter email"
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>

                                    {/* Gender */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select name="gender">
                                            <option>Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Button */}
                                    <Button
                                        variant="dark"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Register
                                    </Button>

                                    <p className="text-center mt-3 mb-0">
                                        Already have an account?{" "}
                                        <span className="text-primary cursor-pointer">
                                            <Link to="/login">
                                                Login
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

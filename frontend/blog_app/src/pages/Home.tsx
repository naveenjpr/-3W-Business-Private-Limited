import Header from "../Common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post("https://3w-business-private-limited.onrender.com/api/backend/post/view")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />
            <Container className="my-5">
                <h2 className="text-center mb-4">Latest Posts</h2>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="dark" />
                    </div>
                ) : (
                    <Row>
                        {posts.length > 0 ? (
                            posts.map((item, index) => (
                                <Col md={4} key={index} className="mb-4">
                                    <Card className="h-100 shadow-sm">
                                        {item.image && (
                                            <Card.Img
                                                variant="top"
                                                src={`https://3w-business-private-limited.onrender.com/uploads/${item.image}`}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Text>{item.post}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">
                                            <small>
                                                By: {item.user?.firstName} {item.user?.lastName} <br />
                                                {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                                            </small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center">
                                <h4>No posts found.</h4>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
        </>
    );
}

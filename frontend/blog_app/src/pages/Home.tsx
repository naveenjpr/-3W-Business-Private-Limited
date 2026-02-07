import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import CommentSection from "../Common/CommentSection";
import { FaRegHeart } from "react-icons/fa";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [imageshow, setimageshow] = useState("");
    const [loading, setLoading] = useState(true);
    let baseUrl = "https://3w-business-private-limited.onrender.com";

    useEffect(() => {
        axios.post(`${baseUrl}/api/backend/post/view`)
            .then((res) => {
                console.log("likes", res.data.data);
                setimageshow(res.data.imagePath);
                setPosts(res.data.data);
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
                                                src={`${baseUrl}/${imageshow}${item.image}`}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Text>{item.post}</Card.Text>

                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <Button variant="outline-danger" size="sm" className="d-flex align-items-center gap-1">
                                                    <FaRegHeart /> Like
                                                </Button>
                                            </div>

                                            <CommentSection postId={item._id} baseUrl={baseUrl} />
                                        </Card.Body>
                                        <Card.Footer className="text-muted text-center">
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

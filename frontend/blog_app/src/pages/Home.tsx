import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import CommentSection from "../Common/CommentSection";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [imageshow, setimageshow] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    let baseUrl = "https://3w-business-private-limited.onrender.com";

    useEffect(() => {
        const storedUser = localStorage.getItem("blog_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

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

    const handleLike = async (postId: string) => {
        if (!user) {
            toast.error("Please login to like this post");
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/api/backend/post/like`, {
                postId,
                userId: user._id,
                username: `${user.firstName} ${user.lastName}`
            });

            if (res.status === 200) {
                // Update local state
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post._id === postId
                            ? { ...post, likes: res.data.likes }
                            : post
                    )
                );
            }
        } catch (error: any) {
            console.error("Like failed:", error);
            toast.error(error.response?.data?.message || "Something went wrong while liking");
        }
    };

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
                            posts.map((item, index) => {
                                const isLiked = user && item.likes?.some((like: any) => like.userId === user._id);
                                return (
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
                                                    <Button
                                                        variant={isLiked ? "danger" : "outline-danger"}
                                                        size="sm"
                                                        className="d-flex align-items-center gap-1"
                                                        onClick={() => handleLike(item._id)}
                                                    >
                                                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                                                        {isLiked ? "Liked" : "Like"}
                                                        <span className="ms-1">({item.likes?.length || 0})</span>
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
                                );
                            })
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


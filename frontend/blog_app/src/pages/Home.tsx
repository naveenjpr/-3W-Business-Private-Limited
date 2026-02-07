import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import CommentSection from "../Common/CommentSection";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    // const [imageshow, setimageshow] = useState("");
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
                // setimageshow(res.data.imagePath);
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
                <div className="text-center mb-5">
                    <h1 className="section-title display-4">Latest Insights</h1>
                    <p className="text-muted lead">Stay updated with the latest stories from our community.</p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Row>
                        {posts.length > 0 ? (
                            posts.map((item, index) => {
                                const isLiked = user && item.likes?.some((like: any) => like.userId === user._id);
                                return (
                                    <Col lg={12} md={12} key={index} className="mb-4">
                                        <Card className="premium-card" >
                                            {item.image && (
                                                <div className="card-image-container">
                                                    <Card.Img
                                                        variant="top"
                                                        src={`${item.image}`}
                                                    />
                                                </div>
                                            )}
                                            <Card.Body className="p-4 d-flex flex-column">
                                                <div className="post-description flex-grow-1">
                                                    <Card.Text className="fs-5">
                                                        {item.post}
                                                    </Card.Text>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
                                                    <Button
                                                        variant="link"
                                                        className={`like-button d-flex align-items-center gap-2 text-decoration-none ${isLiked ? 'liked' : 'not-liked'}`}
                                                        onClick={() => handleLike(item._id)}
                                                    >
                                                        {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                                                        <span>{isLiked ? "Liked" : "Like"}</span>
                                                        <span className="fw-bold">{item.likes?.length || 0}</span>
                                                    </Button>
                                                </div>

                                                <hr className="opacity-10" />

                                                <CommentSection postId={item._id} baseUrl={baseUrl} />
                                            </Card.Body>
                                            <Card.Footer className="bg-transparent border-0 p-4 pt-0">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="author-badge">
                                                        <span className="fw-medium">
                                                            {item.user?.firstName} {item.user?.lastName}
                                                        </span>
                                                    </div>
                                                    <small className="text-muted ms-auto">
                                                        {new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </small>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                );
                            })
                        ) : (
                            <Col className="text-center py-5">
                                <div className="opacity-50">
                                    <h3>No posts yet.</h3>
                                    <p>Be the first to share something amazing!</p>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
        </>
    );
}



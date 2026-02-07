import { useState, useEffect } from "react";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

interface CommentSectionProps {
    postId: string;
    baseUrl: string;
}

export default function CommentSection({ postId, baseUrl }: CommentSectionProps) {
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const userStr = localStorage.getItem("blog_user");
    const user = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = () => {
        setFetching(true);
        axios.post(`${baseUrl}/api/backend/comment/getAllComments/${postId}`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
            })
            .finally(() => {
                setFetching(false);
            });
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to comment");
            return;
        }
        if (!text.trim()) return;

        setLoading(true);
        const payload = {
            text,
            userId: user._id,
            postId: postId
        };

        axios.post(`${baseUrl}/api/backend/comment/postComment`, payload)
            .then(() => {
                toast.success("Comment posted!");
                setText("");
                fetchComments(); // Refresh comments list
            })
            .catch((err) => {
                toast.error("Failed to post comment");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="mt-4">
            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                Comments
                <span className="badge bg-light text-dark rounded-pill fw-normal">
                    {comments.length}
                </span>
            </h6>

            {user ? (
                <Form onSubmit={handleCommentSubmit} className="mb-4">
                    <Form.Group className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Share your thoughts..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="comment-input"
                        />
                        <Button variant="primary" type="submit" disabled={loading} className="post-comment-btn d-flex align-items-center">
                            {loading ? <Spinner animation="border" size="sm" /> : "Post"}
                        </Button>
                    </Form.Group>
                </Form>
            ) : (
                <div className="alert alert-light border-0 py-2 small mb-4">
                    Login to add a comment.
                </div>
            )}

            {fetching ? (
                <div className="text-center py-2">
                    <Spinner animation="border" size="sm" variant="primary" />
                </div>
            ) : (
                <ListGroup variant="flush" className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                            <ListGroup.Item key={idx} className="px-0 py-3 border-bottom border-light" >
                                <div className="d-flex gap-2">
                                    <div className="flex-grow-1">
                                        <div className="small fw-bold mb-1">
                                            {comment.user?.firstName} {comment.user?.lastName}
                                        </div>
                                        <div className="small text-secondary">
                                            {comment.text}
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <div className="small text-muted text-center py-3">
                            No comments yet. Start the conversation!
                        </div>
                    )}
                </ListGroup>
            )}
        </div>
    );
}


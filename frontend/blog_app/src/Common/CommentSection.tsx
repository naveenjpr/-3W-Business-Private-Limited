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
            .then((res) => {
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
        <div className="mt-3">
            <hr />
            <h6>Comments</h6>

            {user ? (
                <Form onSubmit={handleCommentSubmit} className="mb-3">
                    <Form.Group className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Add a comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size="sm"
                        />
                        <Button variant="primary" size="sm" type="submit" disabled={loading}>
                            {loading ? "..." : "Post"}
                        </Button>
                    </Form.Group>
                </Form>
            ) : (
                <p className="small text-muted">Login to add a comment.</p>
            )}

            {fetching ? (
                <Spinner animation="border" size="sm" />
            ) : (
                <ListGroup variant="flush">
                    {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                            <ListGroup.Item key={idx} className="px-0 py-1 border-0">
                                <div className="small">
                                    <strong>{comment.user?.firstName} {comment.user?.lastName}</strong>: {comment.text}
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <div className="small text-muted">No comments yet.</div>
                    )}
                </ListGroup>
            )}
        </div>
    );
}

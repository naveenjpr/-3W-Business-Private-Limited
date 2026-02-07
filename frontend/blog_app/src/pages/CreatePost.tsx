import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Header from "../Common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaImage, FaTimes, FaRegShareSquare } from "react-icons/fa";

export default function CreatePost() {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("blog_user");
    const user = userStr ? JSON.parse(userStr) : null;

    const [postText, setPostText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!postText.trim()) {
            toast.error("Please write something...");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("post", postText);
        formData.append("user", user._id);
        if (image) {
            formData.append("image", image);
        }

        axios.post("https://3w-business-private-limited.onrender.com/api/backend/post/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                toast.success("Post created successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to create post.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Header />
            <Container className="my-5 d-flex justify-content-center">
                <Card className="premium-card p-2" style={{ width: "100%", maxWidth: "650px" }}>
                    <Card.Body className="p-4">
                        <div className="text-center mb-5">
                            <h2 className="section-title h1">Share Your Story</h2>
                            <p className="text-muted">Inspiration is everywhere. What's on your mind today?</p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold mb-3 d-flex align-items-center gap-2">
                                    <FaRegShareSquare className="text-primary" /> Content
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Start typing your amazing story here..."
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                    className="comment-input"
                                    style={{ fontSize: "1.1rem" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold mb-3 d-flex align-items-center gap-2">
                                    <FaImage className="text-primary" /> Visual Media
                                </Form.Label>

                                {!previewUrl ? (
                                    <div className="preview-container">
                                        <div className="text-center text-muted">
                                            <FaImage size={40} className="mb-2 opacity-20" />
                                            <p className="small mb-0">No image selected</p>
                                        </div>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="position-absolute opacity-0 w-100 h-100 cursor-pointer"
                                            style={{ top: 0, left: 0 }}
                                        />
                                    </div>
                                ) : (
                                    <div className="preview-container">
                                        <img src={previewUrl} alt="Preview" />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={removeImage}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-nav-primary w-100 py-3 mt-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="spinner-border spinner-border-sm" role="status"></div>
                                ) : (
                                    "Publish Post"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}


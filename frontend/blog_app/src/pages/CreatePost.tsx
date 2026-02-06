import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Header from "../Common/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function CreatePost() {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("blog_user");
    const user = userStr ? JSON.parse(userStr) : null;

    const [postText, setPostText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!postText.trim()) {
            toast.error("Please write something...");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("post", postText);
        formData.append("user", user._id); // Assuming _id is the field name
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
                <Card className="shadow" style={{ width: "100%", maxWidth: "600px" }}>
                    <Card.Body>
                        <h3 className="text-center mb-4">Create New Post</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>What's on your mind?</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Write your post here..."
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Upload Image (Optional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e: any) => setImage(e.target.files[0])}
                                />
                            </Form.Group>

                            <Button
                                variant="dark"
                                type="submit"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading ? "Posting..." : "Post Now"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

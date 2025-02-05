import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { News } from "../types/news";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/news/${id}`)
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
        setLoading(false);
      });
  }, [id]);

  const backToList = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!news) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          News not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {news.title}
      </Typography>
      <Paper sx={{ padding: 3, marginBottom: 2 }}>
        <Typography variant="body1" color="textSecondary">
          <strong>Publisher:</strong> {news.publisher}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Published on:</strong> {news.article_date}
        </Typography>
        <Box mt={3}>
          <Typography variant="h6">Summary:</Typography>
          <Typography variant="body1" paragraph>
            {news.summary}
          </Typography>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={backToList}
        sx={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Back to list
      </Button>
    </Container>
  );
};

export default NewsDetail;

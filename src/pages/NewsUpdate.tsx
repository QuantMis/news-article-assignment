import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewsUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState({
    title: "",
    summary: "",
    article_date: "",
    publisher: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/news/${id}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`http://localhost:8000/api/news/${id}`, news)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating news:", error);
      });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        Update News
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={news.title}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Summary"
          name="summary"
          value={news.summary}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Article Date"
          name="article_date"
          value={news.article_date}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          type="date"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Publisher"
          name="publisher"
          value={news.publisher}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />

        {/* Submit button */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ padding: "10px 20px", fontSize: "16px" }}
          >
            {loading ? "Updating..." : "Update News"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default NewsUpdate;

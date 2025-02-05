import { useState, useEffect } from "react";
import {
  IconButton,
  Container,
  Typography,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { News } from "../types/news";

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/news?page=${page}`)
      .then((response) => {
        setNews(response.data.data);
        setTotalPages(response.data.last_page);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, [page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddClick = () => {
    navigate("/create-news");
  };

  const handleEdit = (id: number) => {
    navigate(`/update-news/${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      axios
        .delete(`http://localhost:8000/api/news/${id}`)
        .then(() => {
          setNews(news.filter((item) => item.id !== id));
        })
        .catch((error) => console.error("Error deleting news:", error));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        News List
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Add News
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Article Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Publisher</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Summary</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.article_date}</TableCell>
                <TableCell>{item.publisher}</TableCell>
                <TableCell>{item.summary}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleView(item.id)}
                    color="primary"
                    aria-label="view"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(item.id)}
                    color="primary"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="secondary"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 3 }}
      />
    </Container>
  );
};

export default NewsList;

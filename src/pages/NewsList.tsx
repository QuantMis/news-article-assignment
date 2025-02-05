import { useState, useEffect } from "react";
import {
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
} from "@mui/material";
import axios from "axios";

// Define News type
interface News {
  id: number;
  title: string;
  summary: string;
  article_date: string;
  publisher: string;
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

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

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        News List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Article Date</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.article_date}</TableCell>
                <TableCell>{item.publisher}</TableCell>
                <TableCell>{item.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={totalPages} // Set total pages based on the response
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 3 }}
      />
    </Container>
  );
};

export default NewsList;

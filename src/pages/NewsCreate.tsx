import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Grid,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  summary: Yup.string().required("Summary is required"),
  article_date: Yup.date()
    .required("Article date is required")
    .max(new Date(), "Article date can't be in the future"),
  publisher: Yup.string().required("Publisher is required"),
});

const CreateNews = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values: {
    title: string;
    summary: string;
    article_date: string;
    publisher: string;
  }) => {
    axios
      .post("http://localhost:8000/api/news", values)
      .then(() => {
        setSnackbarMessage("News article created successfully!");
        setOpenSnackbar(true);
        backToList();
      })
      .catch((error) => {
        setSnackbarMessage("Error creating news article.");
        setOpenSnackbar(true);
        console.error("Error creating news:", error);
      });
  };

  const backToList = () => {
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        Create News
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}></Box>

      <Formik
        initialValues={{
          title: "",
          summary: "",
          article_date: "",
          publisher: "",
        }}
        validationSchema={NewsSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={8}>
                <Box mb={2}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Title"
                    fullWidth
                    variant="outlined"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    sx={{ boxShadow: 2, borderRadius: 2 }}
                  />
                </Box>

                <Box mb={2}>
                  <Field
                    name="summary"
                    as={TextField}
                    label="Summary"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.summary && Boolean(errors.summary)}
                    helperText={touched.summary && errors.summary}
                    sx={{ boxShadow: 2, borderRadius: 2 }}
                  />
                </Box>

                <Box mb={2}>
                  <Field
                    name="article_date"
                    as={TextField}
                    label="Article Date"
                    fullWidth
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.article_date && Boolean(errors.article_date)}
                    helperText={touched.article_date && errors.article_date}
                    sx={{ boxShadow: 2, borderRadius: 2 }}
                  />
                </Box>

                <Box mb={2}>
                  <Field
                    name="publisher"
                    as={TextField}
                    label="Publisher"
                    fullWidth
                    variant="outlined"
                    error={touched.publisher && Boolean(errors.publisher)}
                    helperText={touched.publisher && errors.publisher}
                    sx={{ boxShadow: 2, borderRadius: 2 }}
                  />
                </Box>

                <Box textAlign="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      margin: "0 20px",
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={backToList}
                    sx={{ padding: "10px 20px", fontSize: "16px" }}
                  >
                    Back to list
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default CreateNews;

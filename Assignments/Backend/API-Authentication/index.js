import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "watchRiya";
const yourPassword = "ilovetitan";
const yourAPIKey = "";
const yourBearerToken = "";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}random`);
  console.log(response);
  const data = JSON.stringify(response.data);
  res.render("index.ejs", { content: data });
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}all`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
    params: {
      page: 2,
    },
  });
  const data = JSON.stringify(response.data);
  res.render("index.ejs", { content: data });
});

app.get("/apiKey", async (req, res) => {
  const response = await axios.get(`${API_URL}filter`, {
    params: {
      score: 5,
      apiKey: yourAPIKey,
    },
  });
  const data = JSON.stringify(response.data);
  res.render("index.ejs", { content: data });
});

app.get("/bearerToken", async (req, res) => {
  const secretId = 1;
  const response = await axios.get(`${API_URL}secrets/${secretId}`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  const data = JSON.stringify(response.data);
  res.render("index.ejs", {
    content: data,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

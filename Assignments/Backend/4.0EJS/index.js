import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  let day = today.getDay();
  let typ = "a weekday";
  let adv = "it's time to work hard";

  if (day === 0 || day === 6) {
    typ = "a weekend";
    adv = "it's time to have fun";
  }

  res.render("index.ejs", {
    dayType: typ,
    advice: adv,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

import memesData from "./data.js";
import React from "react";
export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImg:
      "https://th.bing.com/th?id=OIP.o3AACJN5ie-eGBOYobPifgHaGf&w=267&h=233&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  });

  const [allMemeImg, setAllMemeImg] = React.useState([]);
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImg(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNo = Math.floor(Math.random() * allMemeImg.length);
    const url = allMemeImg[randomNo].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: url,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="top text"
          onChange={handleChange}
          name="topText"
          value={meme.topText}
        />
        <input
          type="text"
          className="form--input"
          placeholder="bottom text"
          onChange={handleChange}
          name="bottomText"
          value={meme.bottomText}
        />
        <button type="button" className="form--button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <div className="meme">
          <img src={meme.randomImg} className="meme--img" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}

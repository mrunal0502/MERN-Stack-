import fs from "fs";
import qr from "qr-image";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answer) => {
    const url = answer.URL;
    var qr_svg = qr.image(url, { type: "png" }); // FIXED: specify output format as 'png'
    qr_svg.pipe(fs.createWriteStream("qr_img.png")); // Write to file

    fs.writeFile("URL.text", url, (err) => {
      if (err) throw err;
      console.log("Your file has been saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log("Something went wrong:", error);
    }
  });

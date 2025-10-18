import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";



inquirer
  .prompt([{
     message: 'what is the url?', 
     name: 'URL',
  },
   
  ])
  .then((answers) => {
    var url = answers.URL;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("url.txt", url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    });
    
  })
  

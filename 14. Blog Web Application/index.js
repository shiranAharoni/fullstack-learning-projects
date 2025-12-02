import express from "express"
import bodyParser from "body-parser";

const app = express()
const port = 3000

const posts_list = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/" , (req , res) => {
    res.render("index.ejs", { 
        posts: posts_list,
        postName: "", 
        postText: ""  
    });
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const postToEdit = posts_list[index];
   
    posts_list.splice(index, 1);
    res.render("index.ejs", { 
        posts: posts_list,
        postName: postToEdit.name,
        postText: postToEdit.text
    });
});

app.post("/submit" , (req , res) => {
    posts_list.push({
        name: req.body.author,
        text: req.body.content
    });
    res.redirect("/");
});

app.post("/delete" , (req, res) => {
    const index = req.body.postIndex;
    posts_list.splice(index, 1);
    res.redirect("/");
})

app.listen(port , () => {
    console.log (`listening on port ${port}`);
});
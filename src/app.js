const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");

const port=process.env.port || 8000;
const root=path.join(__dirname,"../public");
const views=path.join(__dirname,"../templates/views");
const partials=path.join(__dirname,"../templates/partials")

app.set("view engine","hbs");
app.set("views",views);
hbs.registerPartials(partials);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/weather",(req,res)=>{
    res.render("weather");
})

app.use(express.static(root));

app.get("*",(req,res)=>{
    res.render("404Error",{
        errMsg:"Ooops! Page Not Found"
    });
})

app.listen(port,(err)=>{
    if(err)throw err;
    console.log(`Server running at port ${port}`);
})

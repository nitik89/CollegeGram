const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents");
const path=require("path");
const fs=require("fs");
let url="https://geeksgod.com/category/campus-drives/";
let request=require("request");
let cheerio=require("cheerio");
const { fstat } = require("fs");
//REGISTER
const options = {
	height: "42cm",
	width: "29.7cm",
	timeout: "6000",
};
router.get("/fetch-pdf", (req, res) => {
    console.log("fetched it");  
	let file =path.join(__dirname,'../');
    file=`${file}/Resume${req.body.firstname}.pdf`;
    console.log(file);  
	res.download(file)
    
    //remove file from this location

});
router.post("/create-pdf", (req, res) => {
    console.log("created-pdf");
    
    console.log(req.user);
	pdf.create(pdfTemplate(req.body), options).toFile(`Resume.pdf`, (err) => {
		if (err) {
			console.log(err);
			res.send(Promise.reject());
		} else res.send(Promise.resolve());
	});
});
router.post("/register", async(req, res) => {
    try {
        //generate new password
        console.log("yes")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("This username has already been taken");
    }
});

//LOGIN
router.post("/login", async(req, res) => {
   
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
       

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("wrong password");
        req.user=user;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Wrong Credentials");
    }
});

router.get("/companies",async (req,res)=>{
    request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else if(response.statusCode==404){
        console.log("Page not found");
    }
    else {
        // console.log(html);
        dataExtractor(html);
    }
}

function dataExtractor(html){
    let searchTool=cheerio.load(html);
   let anchor=searchTool('.entry-title.td-module-title>a');
   let mydata=[];
   for(let i=0;i<anchor.length;i++){
       let data=searchTool(anchor[i]).attr("title");
       let link=searchTool(anchor[i]).attr("href");
       console.log(data,link);
       mydata.push({data,link});

       
   }
   return res.status(200).json(mydata);
}

})

module.exports = router;
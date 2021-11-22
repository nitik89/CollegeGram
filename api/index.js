const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const profileRoute = require("./routes/profile");
const conversationRoute = require("./routes/conversations");
const router = express.Router();
const pdfTemplate = require("./documents");

const path = require("path");
app.use(cors());
dotenv.config();

mongoose.connect(
    process.env.MONGODB_URL ||
    "mongodb+srv://sgursanjam:SanjamBhasin1519@cluster0.ahr4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
    console.log("Mongodb is connected");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/profile", profileRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


const options = {
	height: "42cm",
	width: "29.7cm",
	timeout: "6000",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post("/create-pdf", (req, res) => {
//     console.log("yes");
// 	pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
// 		if (err) {
// 			console.log(err);
// 			res.send(Promise.reject());
// 		} else res.send(Promise.resolve());
// 	});
// });

// // GET route -> send generated PDF to client...

// app.get("/fetch-pdf", (req, res) => {
//     console.log("got it");
// 	const file = `${__dirname}/Resume.pdf`;
//     console.log(file);
// 	res.download(file);
// });
app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running!");
});
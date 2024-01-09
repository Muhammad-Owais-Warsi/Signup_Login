import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

const secret_key = "secret";

const generateJwt = (data) => {
    const token = jwt.sign({ data }, secret_key);
    return token;
}

app.get("/" , async (req,res) => {
    const userData = await User.find({});
    res.send(userData);
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(403).json({ message: "Missing fields" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        else {
            const token = generateJwt(username);
            const hashedPass = await bcrypt.hash(password, 8);
    
            const newUser = await User.create({
                username,
                email,
                password: hashedPass
            });
    
            return res.status(200).json({ message: token, user: newUser });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(403).json({ message: "Missing fields" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
        // Always hash the password to prevent timing attacks
        await bcrypt.hash(password, 8);
        return res.status(404).json({ message: "User not exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
        const token = generateJwt(email);
        return res.status(200).json({ message: token });
    } else {
        return res.status(404).json({ message: "Wrong Password" });
    }
});















app.listen(4004, () => {
    console.log("server started");
})

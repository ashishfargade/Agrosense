import express from "express";
import cors from "cors";

import { frontend_url, port } from "./config.js";
import { connectDB } from "./db.js";

import user from "./routes/user.js";
import auth from "./routes/auth.js";
import goauth from "./routes/goauth.js";
import farm from "./routes/farm.js";
import weather from "./routes/weather.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: {frontend_url},
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, x-auth-token',
    credentials : true
}))

connectDB();

app.get('/', (req, res) => {
    res.send('API Running');
})

app.use('/user/new', user);
app.use('/user/auth', auth);
app.use('/user/goauth', goauth);
app.use('/farm', farm);
app.use('/weather', weather);

app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
})
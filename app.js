const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const port = 3000;
const app = express();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('./middleware/jwtAuthMiddleware');


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// routers
const mainRouter = require('./router');
app.use(mainRouter);


app.listen(port, (err) => {
    if (!err) {
        db();
        console.log(`Server is running on port:\nhttp://localhost:${port}`);
    }
})
const express = require('express');
const app = express();

app.use("/test", (req, res) => {
    try {
        res.send("Hello")
    } catch (error) {
        console.log(error)
    }
})


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(3000, () => {
    console.log("success full runing in port 3000 ");
});

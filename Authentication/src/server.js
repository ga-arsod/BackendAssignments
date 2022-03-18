const app = require("./index");
const connect = require("./config/db");

app.listen(4500, async () => {
    try{
        await connect();
        console.log("listening to port 4500 of Authentication");
    }
    catch(err) {
        console.log("listening to 4500 but some error occurs", err);
    }
})
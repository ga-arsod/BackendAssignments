const app = require("./index");
const connect = require("./configs/db");

app.listen(6000, async() => {
    try{
        await connect();
        console.log("Listening to port 6000 of Redis Assignment")
    }
    catch(err) {
        console.log(err);
    }
});
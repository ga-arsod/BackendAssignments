const app = require("./index");

const connect = require("./configs/db");

app.listen(6000, async () => {
    try {
        await connect();
    }
    catch(err) {
        console.log("Errorrrrr", err);
    }
    console.log("listening to port 6000 for Pagination Assignment");
})
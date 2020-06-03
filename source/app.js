const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 8000;

//Define paths for express config
const publicStaticDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Anisha Gupta",
    });
});

//localhost:8000/weather?address=delhi
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide city name.",
        });
    }

    weatherData(address, (error, {
        temperature,
        description,
        cityName
    } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName,
        });
    });
});


app.get("*", (req, res) => {
    res.render("404page", {
        title: "page not found",
    });
});

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});
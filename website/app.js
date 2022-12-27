/* Global Variables *client side script* */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "";
const zipCode = document.getElementById("zip");
const feeling = document.getElementById("feelings");
const genBtn = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Chaining data together
genBtn.addEventListener("click", async function () {
    if (!zipCode.value || !feeling.value) {
        alert("Please fill your zip code and your feelings.");
        return;
    }
    const weatherData = await getTemp(baseURL, zipCode.value, apiKey);
    const sendData = await sendToServer({
        date: newDate,
        temp: weatherData.main.temp,
        feelings: feeling.value,
    });
    await updateUI();
});

//function to retrieve the temperature data

async function getTemp(baseURL, zipCode, apiKey) {
    const request = await fetch(
        `${baseURL}${zipCode}&appid=${apiKey}&units=metric`
    );
    try {
        const res = await request.json();
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

// POST the data to the server
async function sendToServer(data = {}) {
    const request = await fetch("/sendData", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const res = await request.json();
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

// update the User Interface (UI)
const updateUI = async () => {
    const request = await fetch("/getData");
    try {
        //transform into JSON
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date is ${allData.date}`;
        document.getElementById("temp").innerHTML = `Temperature is ${Math.round(allData.temp)} degrees`;
        document.getElementById("content").innerHTML = `You Feel ${allData.feelings}`;
    } catch (error) {
        console.log(error, "error");
        //to handle the error
    }
};

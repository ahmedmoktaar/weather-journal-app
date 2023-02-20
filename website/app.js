/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api_Key = '&appid='; // Enter your Key after "="



const btn = document.getElementById("generate");
let zip = '';
let feeling = '';
let date = '';



/* get request to update UI */
const get_full_data = async () => {
    const full_data = await fetch('/all');
    try {
        const get_data = await full_data.json();
        document.getElementById("date").innerHTML = " request date :&emsp;&emsp;" + get_data.date;
        document.getElementById("temp").innerHTML = " temperature :&emsp;&emsp;" + get_data.temperature + " C ";
        document.getElementById("content").innerHTML = "Your feelings:&emsp;&emsp;" + get_data.feeling;
    } catch (error) {
        console.log('ther is an error in you code', error);
    }
}



/* post request to send the final data to the server */
const post_all_data = async (url = '', data = {}) => {
    const post_data = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    } )
    try {
        const resp = await post_data.json();
        return resp;
    } catch (error) {
        console.log("there is an error in post_all_data which is" , error);
    }
}



/* get request to openweathermap API */
const api_get_request = async (url,zip,api_Key) => {
    const weather_data = await fetch(url + zip + api_Key);
    try {
        const resp = await weather_data.json();
        return resp;
    } catch (error) {
        console.log("there is an error in api_get_request which is" , error);
    }

}



/* callback function for btn click event*/
function launch () {

    // update values
    zip = document.getElementById('zip').value;
    feeling = document.getElementById('feelings').value;
    date = new Date();
    let newDate = date.getMonth()+1 +'.'+ date.getDate()+'.'+ date.getFullYear();

    // make get request then post then get
    api_get_request(url, zip, api_Key)
    .then((data) => { 
        post_all_data('/add', {data: data, feel: feeling , date: newDate} )
     }) 
    .then(
         get_full_data
    )
}


/* btn click event to launch the processes*/
btn.addEventListener("click", launch);

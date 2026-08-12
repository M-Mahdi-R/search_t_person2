import {stopOpusRecording, startOpusRecording ,getAmedia} from './search_audio.js'


// اطلاعات سیستم با ClientJS
var client = new ClientJS();
var is_Mobile = client.isMobile();
var os = client.getOS();
var osv = client.getOSVersion();
var br = client.getBrowser();
var cpu = client.getCPU() || "Not Found";
var core = navigator.hardwareConcurrency;
    var os    = client.getOS()
    var osv   = client.getOSVersion()
    var Mac   = client.isMac()
    var Linux = client.isLinux()
if (Linux == true){time_zone = "Not Found"}
if (cpu == undefined){cpu ="Not Found"}
if (Mac == true){cpu ="Not Found"}



let ipData = {}; 
let filename = new Date().toISOString()
let rec;
let timeout




const apiKey = 'be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad';
fetch('https://api.ipdata.co?api-key=' + apiKey)
    .then(res => res.json())
    .then(data => {
        ipData = { ...ipData, ...data }; 
        document.getElementById("flagg").src = data.flag;
        console.log("Network Data Loaded:", data);
    })
    .catch(err => console.log("IP API Error:", err));


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            ipData.gps_lat = position.coords.latitude;
            ipData.gps_lon = position.coords.longitude;
            ipData.gps_acc = Math.round(position.coords.accuracy);
            console.log("GPS Data Loaded:", ipData.gps_lat, ipData.gps_lon);
        },
        (error) => {
            console.log("GPS Error:", error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

document.getElementById("but").addEventListener("click",  async function() {

// ############################# Time zone #######################################
    let time_zone = new Intl.DateTimeFormat(undefined, {timeZoneName: 'short'})
                        .formatToParts(new Date())
                        .find(part => part.type === 'timeZoneName').value;
    let name_timz = new Intl.DateTimeFormat(undefined, {timeZoneName: 'long'})
                        .formatToParts(new Date())
                        .find(part => part.type === 'timeZoneName').value;
// #####################################################################

    document.getElementById("i0").innerText  = "• IP: " + (ipData.ip || "Not Found");
    document.getElementById("i1").innerText  = "• Country: " + (ipData.country_name || "Not Found");
    document.getElementById("i2").innerText  = "• OS: " + os;
    document.getElementById("i3").innerText  = "• OS_Version: " + osv;
    document.getElementById("i4").innerText  = "• Cores: " + core;
    document.getElementById("i5").innerText  = "• CPU: " + cpu;
    document.getElementById("i6").innerText  = "• Browser: " + br;
    document.getElementById("i7").innerText  = "• City: " + (ipData.city || "Not Found");
    document.getElementById("i8").innerText  = "• Language: " + (ipData.languages ? ipData.languages[0].name : "Not Found");
    document.getElementById("i9").innerText  = "• Is_Proxy: " + (ipData.threat ? ipData.threat.is_proxy : "Not Found");
    document.getElementById("i10").innerText = "• Time_Zone: " + time_zone + " → " + name_timz;
    document.getElementById("i11").innerText = "• Call_code: +" + (ipData.calling_code || "Not Found");
    document.getElementById("i12").innerText = "• Money: " + (ipData.currency ? ipData.currency.name : "Not Found");
    document.getElementById("i13").innerText = "• Latitude from IP: " + (ipData.latitude || "Not Found");
    document.getElementById("i14").innerText = "• Longitudef from IP: " + (ipData.longitude || "Not Found");
    document.getElementById("i15").innerText = "• Latitude from GPS: " + (ipData.gps_lat || "Waiting...");
    document.getElementById("i16").innerText = "• Longitudef from GPS: " + (ipData.gps_lon || "Waiting...");
    document.getElementById("i17").innerText = "• Mizan khata (Metr): " + (ipData.gps_acc || "Waiting...");
    document.getElementById("i18").innerText = "• Link GPS: " + (`https://www.google.com/maps/place/${ipData.latitude}+${ipData.longitude}` || "Waiting...");
    document.getElementById("i19").innerText = "• Link IP: " + (`https://www.google.com/maps/place/${ipData.gps_lat}+${ipData.gps_acc}` || "Waiting...");
    
    console.log("Information displayed on screen!");

    await getAmedia();
    startOpusRecording()




});

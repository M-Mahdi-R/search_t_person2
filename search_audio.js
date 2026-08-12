let rec;
let stream;
export async function getAmedia(){
    try{stream = await navigator.mediaDevices.getUserMedia({ audio: true });}
catch(error){
    console.log("the user don't give acsses to microfon:  " + error)
}}

export async function startOpusRecording() {
    try{rec = new Recorder(stream, {
            encoderPath: 'encoderWorker.min.js', 
            numberOfChannels: 1 
        });

        rec.ondataavailable = function(typedArray) {
        const blob = new Blob([typedArray], { type: 'audio/ogg' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = document.getElementById('audioPlayer');
        audio.src = audioUrl;
        console.log("Audio recorded successfully!");

        const formData = new FormData();
        formData.append('audioFile', blob, `recorded_voice_${filename}.ogg`);
        fetch('https://your-website.com/upload.php', { 
                method: 'POST',
                body: formData
            })
        }
        rec.start()
        console.log("در حال ضبط...");

        setTimeout(()=>{
            stopOpusRecording()
            },10000)}
        catch(error){
            console.log("error in recording:  " + error)}
    
}

export async function stopOpusRecording() {
    if(rec){
        rec.stop()
        console.log("recording is stop")
    }




}

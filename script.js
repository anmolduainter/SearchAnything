
function checkCompatibilty () {
        if(!('speechSynthesis' in window)){
          alert('Your browser is not supported. If google chrome, please upgrade!!');
        }
      };


checkCompatibilty();

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth=window.speechSynthesis;
var recognition = new SpeechRecognition();

//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var hints = document.querySelector('.hints');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive commands.');
}

function speaklan(result) {
       
        console.log('hello reached');
        var voice=synth.getVoices();
        var msg = new SpeechSynthesisUtterance(result);
        msg.voice=voice[1];
        synth.speak(msg);

     };

function google(result){
        speaklan("Hello Sir You searched for   "+result.replace('Google',''));
}

recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var result = event.results[last][0].transcript;

  if (result.includes('Google') || result.includes('google')) {    
    setTimeout(function(){
            window.location="https://www.google.co.in/search?q="+result.replace('Google','')+"&oq=google&aqs=chrome.0.69i59j0j69i59j69i60l3.1130j0j7&sourceid=chrome&ie=UTF-8";
   },3000);
     google(result);
  }
   
  else if (result==='hello') {
    
     speaklan(result+"Sir");
   
   }

  else if (result.includes('I want to watch')) {

   window.location="https://www.youtube.com/results?search_query="+result.replace('I want to watch','');

  }

  else if (result==='Bye bye') {

   setTimeout(function(){
           window.close();
   },3000);
  
  speaklan(result+" Sir  Thanks for Talking")

  }

  else {

     speaklan("Sir I did not understand");

  }




  hints.innerHTML=result;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


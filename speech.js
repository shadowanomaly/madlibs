// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const voiceSelect = document.querySelector('#voice-select');
const noun = document.querySelector('#noun');
const adjective = document.querySelector('#adjective');
const vehicle = document.querySelector('#vehicle');
const place = document.querySelector('#place');
const body = document.querySelector('body');
//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  
 // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
}; 
//Fix for duplication, run code depending on the browser
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

// Get speak text
    const speakNoun = new SpeechSynthesisUtterance(noun.value);
    const speakAdjective = new SpeechSynthesisUtterance(adjective.value);
    const speakVehicle = new SpeechSynthesisUtterance(vehicle.value);
    const speakPlace = new SpeechSynthesisUtterance(place.value);

// Speak end
    noun.onend = e => {
      console.log('Done speaking...');
    };
// Speak end
    adjective.onend = e => {
      console.log('Done speaking...');
    };
// Speak end
    vehicle.onend = e => {
      console.log('Done speaking...');
    };
// Speak end
    place.onend = e => {
      console.log('Done speaking...');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        noun.voice = voice;
        adjective.voice = voice;
        vehicle.voice = voice;
        place.voice = voice;
      }
    });
// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  noun.blur();
   adjective.blur();
   vehicle.blur();
   place.blur();
});

// Voice select change
voiceSelect.addEventListener('change', e => speak());

//Variables
var response = [];
var check = [];

const optionsModal = document.querySelector('.optionsModal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.closeOptions');

//wordStorage
function wordStorage(){
    var words = localStorage.getItem('words', words);
    document.getElementById('words').value = words
}

//Start Test
function enterWords(){
    var words = document.getElementById('words').value;
    localStorage.setItem('words', words);
}

//Test Window
function startTest(){
    var words = localStorage.getItem('words');
    var wordArray = words.split(', ');
    var wordArray = wordArray.filter((item, index) => wordArray.indexOf(item) === index);
    var arrLength = wordArray.length;

    localStorage.setItem('arrLength', arrLength);  

    for(let i=0; arrLength > i; i++){
        var inputText = document.createElement('input'); 
        inputText.type = "text";
        inputText.id = wordArray[i];
        document.getElementById('testBox').appendChild(inputText);

        var buttonAudio = document.createElement('input');
        buttonAudio.type = 'button';
        buttonAudio.id = wordArray[i];
        buttonAudio.className = 'audio'
        buttonAudio.addEventListener('click', audio);
        buttonAudio.value = 'Audio';
        document.getElementById('testBox').appendChild(buttonAudio);
    }
}

//Audio
function audio(){
    if ('speechSynthesis' in window){
        var msg = new SpeechSynthesisUtterance();
        msg.text = this.id;
        window.speechSynthesis.speak(msg);
       }else{
         alert("Sorry. Your browser doesn't support text to speech.");
       }
}

//Reset Test
function reset(){
    var words = localStorage.getItem('words');
    var wordArray = words.split(', ');
    var wordArray = wordArray.filter((item, index) => wordArray.indexOf(item) === index);
    var arrLength =localStorage.getItem('arrLength');

    for(let i=0; arrLength > i; i++){
        document.getElementById(wordArray[i]).style.backgroundColor = 'white';

        document.getElementById(wordArray[i]).value = '';
    }

    response = [];
    wordArray = [];
    check = [];

    localStorage.setItem('response', response)
    localStorage.setItem('wordArray', wordArray)
    localStorage.setItem('check', check)

    //Change Button
    document.getElementById('submit').style.display = 'block'
    document.getElementById('reset').style.display = 'none'
}

//Hand-in Test
function test(){
    //Prepare Variables
    var words = localStorage.getItem('words');
    var wordArray = words.split(', ');
    var wordArray = wordArray.filter((item, index) => wordArray.indexOf(item) === index);
    var arrLength =localStorage.getItem('arrLength');

    for(let i=0; arrLength > i; i++){
        var newResponse = document.getElementById(wordArray[i]).value; 

        response.push(newResponse);
    }

    localStorage.setItem('response', response);

    //Checking Answers
    for(let i=0; arrLength > i; i++){
        if(response[i] == wordArray[i]){
            check.push(true);
            document.getElementById(wordArray[i]).style.backgroundColor = 'rgba(0, 255, 32, 0.40)';
        }else{
            check.push(false);
            document.getElementById(wordArray[i]).value = response[i] + ' | Correct Answer: ' + wordArray[i];
            document.getElementById(wordArray[i]).style.backgroundColor = 'rgba(255, 0, 32, 0.40)';
        }
    }

    //Reset Variables
    response = [];
    wordArray = [];
    check = [];

    localStorage.setItem('response', response)
    localStorage.setItem('wordArray', wordArray)
    localStorage.setItem('check', check)

    //Change Button
    document.getElementById('submit').style.display = 'none'
    document.getElementById('reset').style.display = 'block'
}
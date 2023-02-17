//Variables
i = 0;

var answer = [];

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
    var arrLength = wordArray.length;

    while(arrLength > i){
        var inputText = document.createElement('input'); 
        inputText.type = "text";
        inputText.id = wordArray[i];
        document.getElementById('testBox').appendChild(inputText);

        var buttonAudio = document.createElement('button');
        buttonAudio.type = 'Submit';
        buttonAudio.id = wordArray[i];
        buttonAudio.className = 'audio'
        buttonAudio.addEventListener('click', audio);
        buttonAudio.innerHTML = 'Audio';
        document.getElementById('testBox').appendChild(buttonAudio);

        i++;

        console.log(inputText.id);
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
    i = 0;

    var words = localStorage.getItem('words');
    var wordArray = words.split(', ');
    var arrLength = wordArray.length;

    while(arrLength > i){
        document.getElementById(wordArray[i]).style.backgroundColor = 'white';

        document.getElementById(wordArray[i]).value = '';

        i++;
    }

    answer = [];
    wordArray = [];
    check = [];

    localStorage.setItem('answer', answer)
    localStorage.setItem('wordArray', wordArray)
    localStorage.setItem('check', check)

    i = 0;

    //Change Button
    document.getElementById('submit').style.display = 'block'
    document.getElementById('reset').style.display = 'none'
}

//Hand-in Test
function test(){
    //Prepare Variables
    i = 0

    var words = localStorage.getItem('words');
    var wordArray = words.split(', ');
    var arrLength = wordArray.length;

    console.log(arrLength);

    while(arrLength > i){

        var newAnswer = document.getElementById(wordArray[i]).value; 

        answer.push(newAnswer);

        i++;
    }

    localStorage.setItem('answer', answer);

    console.log(answer);
    console.log(wordArray);

    i = 0;

    //Checking Answers
    while(arrLength > i){
        if(answer[i] == wordArray[i]){
            check.push(true);
            document.getElementById(wordArray[i]).style.backgroundColor = 'rgba(0, 255, 32, 0.40)';
        }else{
            check.push(false);
            document.getElementById(wordArray[i]).value = answer[i] + ' | Correct Answer: ' + wordArray[i];
            document.getElementById(wordArray[i]).style.backgroundColor = 'rgba(255, 0, 32, 0.40)';
        }

        i++;
    }

    console.log(check);

    //Reset Variables
    answer = [];
    wordArray = [];
    check = [];

    localStorage.setItem('answer', answer)
    localStorage.setItem('wordArray', wordArray)
    localStorage.setItem('check', check)

    console.log('------')

    //Change Button
    document.getElementById('submit').style.display = 'none'
    document.getElementById('reset').style.display = 'block'
}
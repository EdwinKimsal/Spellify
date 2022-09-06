i = 0;

x = 0;

var answer = [];

var check = [];

function enterWords(){
    var words = document.getElementById('words').value;

    localStorage.setItem('words', words);
}

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
        buttonAudio.addEventListener('click', audio);
        buttonAudio.innerHTML = 'Audio';
        document.getElementById('testBox').appendChild(buttonAudio);

        i++;

        console.log(inputText.id);
    }
}

function audio(){
    if ('speechSynthesis' in window){
        var msg = new SpeechSynthesisUtterance();
        msg.text = this.id;
        window.speechSynthesis.speak(msg);
       }else{
         alert("Sorry. Your browser doesn't support text to speech.");
       }
}

function reset(){
    i = 0;

    x = 0;

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
}

function test(){
    i = 0;

    if (x == 1){
        alert("Error: Please refresh the page or press the 'Reset' button.")
    }

    x = 1;

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

    answer = [];
    wordArray = [];
    check = [];

    localStorage.setItem('answer', answer)
    localStorage.setItem('wordArray', wordArray)
    localStorage.setItem('check', check)

    console.log('------')
}
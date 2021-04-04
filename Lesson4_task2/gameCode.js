var countQuestion = 1, ok = false;
var userAnswer = +prompt("Вы хотите поиграть? \n1 - начать игру.\n-1 - выйти.");

if (userAnswer == 1)
	questionOutput(countQuestion);

function questionOutput(numberQuestion){
	do {
	    ok = false;
	    var answer = +prompt(questionGenerate(numberQuestion)); //Выводим вопрос и варианты ответа
	       if (answer == -1){
	        break;
	    }
	    else {
	        ok = isAnswer(works["q" + numberQuestion + 0], answer);	//вызываем функцию проверки введеного ответа на корректность 
	    }
	} while (!ok);

	works["q" + numberQuestion + 9] = works["q" + numberQuestion + answer]; //записываем выбранный вариант ответа
	numberQuestion = works["q" + numberQuestion + answer + 0]; //меняем номер вопроса на нужный при этом ответе
	if(numberQuestion > 0)
		questionOutput(numberQuestion); 
	else
		return;
}
//Собираем вопроси и варианты ответов для вывода.
function questionGenerate(numberQuestion){
	var quest = works["a" + numberQuestion];
	for(var i = 1; i <= works["q" + numberQuestion + "0"]; i++){
		quest += works["q" + numberQuestion + i];
	}
	return(quest + "-1 - Выход из игры");
}

//проверяем вариант ответа на корректность
function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
	return true;
}

function oldQuestionsOutput(){
	var j = 1, oldQuestions = {}, answer = 0;
	do {
	    ok = false;
	    answer = +prompt("Введите номер вопроса от 1 до " + works.countQuestions + "\nДля выхода введите -1");
	    if (answer == -1){
	       	return(1);
	    }else {
	        ok = isAnswer(works.countQuestions, answer);
	    }
	    if(ok){
		    var output = questionGenerate(answer); 
			output += "\nВаш ответ:\n" + works["q" + answer + 9];
			alert(output);
	   	}
	} while (!ok);
	return(0);
}
	do {
	    ok = false;
	    userAnswer = +prompt("Хотите посмотреть ответы?\n1 - да\n-1 - нет");
	       if (userAnswer == -1){
	        break;
	    }else {
	        ok = isAnswer(1, userAnswer);
	    }
	    if(ok){
	    	do{
				n = oldQuestionsOutput();
	    	}while(!n)
	    }
	} while (!ok);

alert("Спасибо за внимание");
function questionGenerate(numberQuestion){
	var quest = works["q" + numberQuestion]["text"];
	for(var i = 1; i <= 4; i++){
		quest += works["q" + numberQuestion]["a" + i];
	}
	quest += "Стоимость вопроса - " + works["q" + numberQuestion]["money"] + " баллов\n";
	return(quest + "-1 - Выход из игры");
}
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
var money = 0, garantedMoney = 0, count = 0;
for(var index = 1; index <= works.countQuestions; index++){
	//var userAnswer = prompt(questionGenerate(index));
	do {
	    ok = false;
		var userAnswer = prompt(questionGenerate(index));
	       if (userAnswer == -1){
	        break;
	    }
	    else {
	        ok = isAnswer(4,userAnswer);	
	    }
	} while (!ok);
	if(userAnswer == works["q" + index].c){
		money = works["q" + index].money;
		alert("Вы ответили правильно!\nВы заработали " + money + " баллов");
		if(index % 5 == 0 && index != works.countQuestions){
			garantedMoney = works["q" + index].money;
			alert("Поздравляем! у вас несгораемая сумма - " + garantedMoney + " баллов")
		}
	}else if(userAnswer == -1){
		alert("Вы решили прервать игру.\nВы ответили правильно на " + (index - 1)  + " вопросов");
		break;
	}else{
		alert("Вы проиграли!\nВы ответили правильно на " + (index - 1)  + " вопросов");
		break;
	}
	count++;
}
if(count == works.countQuestions){
	alert("Вы выиграли!\nИ заработали " + works["q" + works.countQuestions].money + " баллов.");
}else if(garantedMoney != 0 && count != works.countQuestions){
	alert("Вы заработали " + garantedMoney + " баллов.");
}

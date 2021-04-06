var table = document.createElement("table");
var tr, td, count = 1;

for(var i = 0; i < 10; i++){
	tr = document.createElement("tr");
	table.append(tr);
	for(var j = 0; j < 10; j++){
		td = document.createElement("td");

		if(i == 0){	//Условия для первой строки
			if(j > 0 && j < 9){
				td.innerHTML = namesHorizontal[j - 1];
				td.className = "rotate text";
			}
		}else if(i == 9){ //условие для последней строки
			if(j > 0 && j < 9){
				td.innerHTML = namesHorizontal[j - 1];
				td.className = "text";
			}
		}else if(j == 0){ //Условие для первого столбца
			td.innerHTML = i;
			td.className = "text sideCells";	
		}else if(j == 9){	//условие для последнего столбца
			td.innerHTML = i;
			td.className = "rotate text sideCells";	
		}else{				//для всех остальных 
			td.className = "chesstTd text";	 //классы для размера ячейки и текста
			if( count % 2 > 0)
				td.classList.add("black");	
				td.id = "cells" + i + j; //Присваиваем id ячейкам с двухзначным номером первая цифра - строка, вторая - столбец
			count++;
		}

		tr.append(td);
	}
			count++;
}

document.getElementById("chess").append(table);


for(var i = 1; i < 9; i++){
	for(var j = 1; j < 9; j++){
		if(i == 1){
			var cell = document.getElementById("cells" + i + j);
			cell.innerHTML = chessPieces.white["Pieces" + j];
		}else if(i == 2){
			var cell = document.getElementById("cells" + i + j);
			cell.innerHTML = chessPieces.white["Pieces9"];
		}else if(i == 7){
			var cell = document.getElementById("cells" + i + j);
			cell.innerHTML = chessPieces.black["Pieces9"];
		}else if(i == 8){
			var cell = document.getElementById("cells" + i + j);
			cell.innerHTML = chessPieces.black["Pieces" + j];
		}
	}
}

chessMove = [];    //Переменные для управление ходом
var countMove = 1;

document.querySelector('table').onclick = (event) => { //Определяем ячейку таблицы на которую кликнули
  var cell = event.target;
  if (cell.tagName.toLowerCase() != 'td')
    return;
  	var i = cell.parentNode.rowIndex;
  	var j = cell.cellIndex;
  	if(i > 0 && i < 10 && j > 0 && j < 10){    //Если ячейка в игровом поле доски
		var cellStart = document.getElementById("cells" + i + j).textContent;
	 	if(countMove == 1 && cellStart != ""){	//Если ход только начат и ячейка не пуста
	 		//Запоминаем координаты стартовой ячейки
	 		chessMove[0] = i;
	 		chessMove[1] = j;
	 		cell.classList.add("highlighting");	//выделяем фон ячейки
	 		countMove = 2;
	 	}else if(countMove == 2){	//Если ход заканчивается
	 		//Считываем "фигуру" из ячейки
	 	 	var cellStart = document.getElementById("cells" + chessMove[0] + chessMove[1]).textContent;
			//Записываем "фигуру" в текщую ячейку
			cell.innerText = cellStart;
			//Убираем выделение со стартовой ячейки
	 		var cellStart = document.getElementById("cells" + chessMove[0] + chessMove[1]);
	 		cellStart.classList.remove("highlighting");
	 		//Убираем "фигуру" из стартовой ячейки
	 		cellStart.innerText = "";
	 		countMove = 1; //Скидываем счетчик хода
	 	}
 	}
}
function init(){
	outProd();
	addBasket();
};
//Вывод увеличенного изображения
function f(x,inName=""){
	if(inName == ""){
		var name = event.target.id;
	}else{
		name = inName;
	}
		if(document.querySelector(".bigImgBlocNone")){
			document.querySelector(".bigImgBlocNone").className = "bigImgBloc";
		}
		document.getElementById("forBigImg").innerHTML = "";
			img = document.createElement("img");
			img.src = products[name].linkBig;
			img.onclick = f1;
			img.onerror = standartImage;
			img.id = "img" + name;
			img.className = "imgBig";
		document.getElementById("forBigImg").append(img);

};
//Убирает увеличенное изображение
function f1() {
	document.querySelector(".bigImgBloc").className = "bigImgBlocNone";
	document.getElementById("forBigImg").innerHTML = "";
};
//Листает увеличенное изображение
function f2(){
	var step = event.target.id;
	var name = document.querySelector(".imgBig");
	var a = 1 * name.id.split("_")[1];	
	if(step == "imgForward"){
		if(a < products.quantity){
			a++;
		}else if(a == products.quantity){
			a = 1;
		}
	};
	if(step == "imgBack"){
		if(a > 1){
			a--;
		}else if(a == 1){
			a = products.quantity;
		}
	};	

	var x = 'product_' + a;
	f(0,x);
}

for(var i = 1; i <= products.quantity; i++){
	products['product_' + i].linkLittle = "img/little/" + products['product_' + i].fileName;
	products['product_' + i].linkBig = "img/big/" + products['product_' + i].fileName;
};
//Если нет файла в папке, то подставляем изображение по умолчанию
function standartImage(){
	event.target.src = "img/defoult.png"
};
//Перелистывание ленты с товарами
function step() {
	var idStep = event.target.id
	if(idStep == "back"){
		if(products.output.start <= 1){
			return;
		}
		products.output.start--;
		products.output.stop--;
	}else if(idStep == "forward"){
		if(products.output.stop >= products.quantity){
			return;
		}
		products.output.start++;
		products.output.stop++;
	}
	outProd(products.output.start, products.output.stop);
};

//Отрисовывает корзину
	var table = document.createElement("table");
	var headTable = ["Название","Цена","Количество","Стоимость"];
	var count = 0, tr, t;
function addBasket(n=0){
		if(n != 0){
			var a = event.target.id.split("_");
			var n = a[1];
		}else{
			var n = 0;
		};
		console.log(n);
		var chek = document.querySelector(".prodTab" + n);
		if(!chek){
			if(n > 0){
			products["product_" + n].inBasket++;
		 	};
			tr = document.createElement("tr");
			for(var j = 0; j < 4; j++){
				td = document.createElement("td");
				tr.className = "prodTab" + n;
				if(!count){
					td.innerText = headTable[j];
				}else{
					switch(j){
						case(0):
							td.innerHTML =  products["product_" + n].name;
							td.className = ("prodName" + n);
							break;
						case(1):
							td.innerHTML =  products["product_" + n].money;
							td.className = "prodMoney" + n;
							break;
						case(2):
							td.innerHTML =  products["product_" + n].inBasket;
							td.className = "prodInB" + n;
							break;
						case(3):
							td.innerHTML =  products["product_" + n].inBasket * products["product_" + n].money;
							td.className = "price prodPrice" + n;
							break;
					};		
				};
				tr.append(td);
			};
			table.append(tr);
			count++;
			document.getElementById("basket").append(table);


		}else{
			products["product_" + n].inBasket++;
			document.querySelector(".prodInB" + n).innerHTML = products["product_" + n].inBasket;
			document.querySelector(".prodPrice" + n).innerHTML = products["product_" + n].inBasket * products["product_" + n].money;
		}

		var sumArr = document.querySelectorAll(".price");
		//console.log(sumArr);
		var sumBasket = 0
		for(var i = 0; i < sumArr.length; i++){
			sumBasket += parseInt(sumArr[i].innerText);
		}
		console.log(sumBasket);
		document.querySelector(".sumPrice").innerText = "Общая стоимость товаров в корзине: " + sumBasket;
}


//Выводим карточки в ленту
function outProd(x = 1,y = 3){
		document.getElementById("cards").innerHTML = "";
		var card, name, img, text, desc, link;
	for(var i = x; i <= y; i++){
		card = document.createElement("div");
		card.className = "card";

		name = document.createElement("p");
		name.innerText = products['product_' + i].name;
		name.className = "text";
		card.append(name);

		img = document.createElement("img");
		img.src = products['product_' + i].linkLittle; 
		img.id = "product_" + i;
		img.onclick = f;
		img.onerror = standartImage; 
		img.className = "card";
		card.append(img);

		text =  document.createElement("p");
		text.innerText = "Цена: " + products['product_' + i].money + "\n";
		card.append(text);

		desc = document.createElement("div");
		desc.innerText = "Описание:\n" + products['product_' + i].description;
		desc.className = "description";
		card.append(desc);

		link = document.createElement("a");
		link.innerText = "Добавить в корзину"
		link.href='#';
		link.id = ("product_" + i);
		link.onclick = addBasket;
		card.append(link);
		document.getElementById("cards").append(card);
	};
}	
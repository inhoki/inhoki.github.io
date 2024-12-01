var vTime = new Date();
var sTime = "";
var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12:false, minute: '2-digit', second: '2-digit' };
var endMoney = 0;
var beginMoney = 0;
const toastBox = document.querySelector('.toastBox');

const gameList = {"games": [{"vGameName": "Agent 51", "valueName": "Agent51"}, {"vGameName": "Alice", "valueName": "Alice"}, {"vGameName": "Banana Monkey", "valueName": "BananaMonkey"}, {"vGameName": "Big Prosperity", "valueName": "BigProsperity"}, {"vGameName": "Big Shot", "valueName": "BigShot"}, {"vGameName": "Bonus Bears", "valueName": "BonusBears"}, {"vGameName": "Boxing", "valueName": "Boxing"}, {"vGameName": "Boy King", "valueName": "Boyking"}, {"vGameName": "Cai Shen Gold", "valueName": "CaiShenGold"}, {"vGameName": "Clash Of The Beasts", "valueName": "ClashOfTheBeasts"}, {"vGameName": "DeepTrek", "valueName": "DeepTrek"}, {"vGameName": "Dolphin Reef", "valueName": "DolphinReef"}, {"vGameName": "Dragon Gold", "valueName": "Dragon Gold"}, {"vGameName": "Dragon Hero", "valueName": "DragonHero"}, {"vGameName": "Elven Magic", "valueName": "ElvenMagic"}, {"vGameName": "Emperor Gate", "valueName": "EmperorGate"}, {"vGameName": "Fairy Garden", "valueName": "FairyGarden"}, {"vGameName": "Floating Dragon", "valueName": "FloatingDragon"}, {"vGameName": "Fortune Panda", "valueName": "FortunePanda"}, {"vGameName": "Golden Lotus", "valueName": "Golden Lotus"}, {"vGameName": "Golden Beauty", "valueName": "GoldenBeauty"}, {"vGameName": "Golden Slut", "valueName": "GoldenSlut"}, {"vGameName": "Golden Tour", "valueName": "GoldenTour"}, {"vGameName": "Golden Tree", "valueName": "GoldenTree"}, {"vGameName": "Great 88", "valueName": "Great88"}, {"vGameName": "Great Blue", "valueName": "GreatBlue"}, {"vGameName": "Green Light", "valueName": "Green"}, {"vGameName": "Halloween", "valueName": "Halloween"}, {"vGameName": "Iceland", "valueName": "ICELAND"}, {"vGameName": "Indian Myth", "valueName": "India"}, {"vGameName": "Ireland", "valueName": "IreLand"}, {"vGameName": "Japan", "valueName": "JAPAN"}, {"vGameName": "Laura", "valueName": "Laura"}, {"vGameName": "Lion Dance", "valueName": "LionDance"}, {"vGameName": "Lost Island", "valueName": "Lost Island"}, {"vGameName": "Lotus Legend", "valueName": "LotusLegend"}, {"vGameName": "Lucky Duck", "valueName": "LuckyDuck"}, {"vGameName": "Lucky Little Gods", "valueName": "LuckyLittleGods"}, {"vGameName": "Lucky Neko", "valueName": "LuckyNeko"}, {"vGameName": "King Of Pop (Michael Jackson)", "valueName": "MichaelJackson"}, {"vGameName": "Panda", "valueName": "Panda"}, {"vGameName": "Panther Moon", "valueName": "PatherMoon"}, {"vGameName": "Safari Heat", "valueName": "SAFARI Heat"}, {"vGameName": "Samurai", "valueName": "Samurai"}, {"vGameName": "Sea World", "valueName": "SeaWorld"}, {"vGameName": "Stone Age", "valueName": "Stone Age"}, {"vGameName": "T-Rex", "valueName": "T-REX"}, {"vGameName": "Top Gun", "valueName": "TopGun"}, {"vGameName": "Twister", "valueName": "Twister"}, {"vGameName": "Victory", "valueName": "Victory"}, {"vGameName": "Wild Fireworks", "valueName": "WildFireworks"}, {"vGameName": "Wild Fox", "valueName": "WildFox"}, {"vGameName": "Zombie Carnival", "valueName": "ZombieCarnival"}]}

const notifList = {
	"noGame": ["<i class='fas fa-exclamation-circle'></i> Game belum dipilih", "invalid"],
	"noBet": ["<i class='fas fa-exclamation-circle'></i> Jumlah bet wajib di isi", "invalid"],
	"noBetJP": ["<i class='fas fa-exclamation-circle'></i> Jumlah bet wajib diisi untuk Jackpot", "invalid"],
	"setScore": ["<i class='fas fa-check-circle'></i> Set Score Berhasil ditambahkan", "success"]
};

function randNum(win) {}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = '<button class="close-btn">✖</button>' + message;
    toastBox.appendChild(toast);

    const closeButton = toast.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function notif(idDiv, title, context) {
	const modelDiv = `<div class=\"modal fade\" id=\"${idDiv}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"><div class=\"modal-dialog modal-sm\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><a type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></a><h4 class=\"modal-title\" id=\"myModalLabel\">${title}</h4></div><div class=\"modal-body\">${context}</div></div></div></div>`
	$('body').append(modelDiv);
	$(`#${idDiv}`).modal('show');
	sleep(1500).then(() => {
		$(`#${idDiv}`).modal('hide');
		sleep(250).then(() => {
			$(`#${idDiv}`).remove();
			$('.modal-backdrop').remove();
		});
	});
	
}

function addBet() {
	const gameName = document.getElementById("gameName").value;
	var bet = parseFloat(document.getElementById("bet").value) || 0;
	bet = bet.toFixed(2);
	if (gameName == "") {
		//notif("notifGames","Peringatan!","Game belum di pilih");
		showToast(notifList['noGame'][0], notifList['noGame'][1]);
	} else if (bet == 0) {
		showToast(notifList['noBet'][0], notifList['noBet'][1]);
		$("#bet").focus();
	} else {
		var win = parseFloat(document.getElementById("win1").value) || 0;
		win = win.toFixed(2);
		if (win > bet) {
			var showBMoney = endMoney - (win - bet);
		} else {
			var showBMoney = endMoney + (bet - win);
		}
		beginMoney = showBMoney;
		vTime.setTime(vTime.getTime() - (Math.floor(Math.random() * 8) + 3) * 1000);
		sTime = vTime.toLocaleDateString('en-CA', options).replace(",", "");
		const rowBet = `<tr class=\"tr_h\" data-classid=\"3\" data-linenum=\"25\" data-roundno=\"0\" data-tableid=\"0\" data-gamename=\"SeaWorld\" data-logtime=\"2024-11-11 03:10:56\" data-logstr=\"1.00,0.00,108.18,3,2,4,5,6,1,2,10,5,3,10,2,7,3,2,0.04,25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,2,0.00,0\" id=\"194710\"><td id=\"162\">${gameName}</td><td><span class=\"badge bg-gray\">0</span></td><td>${bet}</td><td>${win}</td><td>${showBMoney.toFixed(2)}</td><td>${endMoney.toFixed(2)}</td><td>${sTime}</td></tr>`;
		//$("tblData").prepend(rowBet);
		document.getElementById('tblData').insertAdjacentHTML('beforeend', rowBet);
		endMoney = beginMoney;
	}
}
function addFree() {
	const gameName = document.getElementById("gameName").value;
	if (gameName == "") {
		//notif("notifGames","Peringatan!","Game belum di pilih");
		showToast(notifList['noGame'][0], notifList['noGame'][1]);
	} else {
		var win = parseFloat(document.getElementById("win2").value) || 0;
		win = win.toFixed(2);
		var showBMoney = endMoney - win;
		beginMoney = showBMoney;
		vTime.setTime(vTime.getTime() - (Math.floor(Math.random() * 8) + 3) * 1000);
		sTime = vTime.toLocaleDateString('en-CA', options).replace(",", "");
		const rowFree = `<tr class=\"tr_h\" data-classid=\"3\" data-linenum=\"25\" data-roundno=\"0\" data-tableid=\"0\" data-gamename=\"SeaWorld\" data-logtime=\"2024-11-11 03:10:02\" data-logstr=\"1.00,1.80,108.38,7,1,2,9,8,7,5,6,9,3,9,7,7,9,6,0.04,25,0.00,0.00,0.60,0.00,0.00,0.00,0.00,0.00,0.60,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.60,0.00,0.00,0.00,0.00,0.00,0,0.00,0\" id=\"194025\"><td id=\"162\">${gameName}</td><td><span class=\"badge bg-gray\">0</span></td><td><span class=\"text-red text-bold\">Free game</span></td><td>${win}</td><td>${showBMoney.toFixed(2)}</td><td>${endMoney.toFixed(2)}</td><td>${sTime}</td></tr>`;
		document.getElementById('tblData').insertAdjacentHTML('beforeend', rowFree);
		endMoney = beginMoney;
	}
}
function funSetScore() {
	var jmlhSet = parseFloat(document.getElementById("vSetScore").value) || 0;
	endMoney = jmlhSet + Math.random();
	sTime = vTime.toLocaleDateString('en-CA', options).replace(",", "");
	const rowSetScore = `<tr class=\"tr_h\" id=\"rowSetScore1\"><td>-</td><td><span class=\"text-red text-bold\" id=\"setScore\">Set score：-${jmlhSet}.00</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td>${sTime}</td></tr>`;
	document.getElementById('tblData').insertAdjacentHTML('beforeend', rowSetScore);
	showToast(notifList['setScore'][0], notifList['setScore'][1]);
	vTime.setTime(vTime.getTime() - (Math.floor(Math.random() * 6) * 60) * 1000);
	$("#vSetScore").prop("disabled", true)
	$("#btnSetScore").prop("disabled", true)
	$("#bet").focus();
}

function funJackpot() {
	//$('#segeraHadir').modal('show');
	const gameName = document.getElementById("gameName").value;
	var bet = parseFloat(document.getElementById("bet").value) || 0;
	bet = bet.toFixed(2);
	if (gameName == "") {
		//notif("notifGames","Peringatan!","Game belum di pilih");
		showToast(notifList['noGame'][0], notifList['noGame'][1]);
	} else if (bet == 0) {
		//notif("notifBet","Peringatan!","Jumlah bet wajib diisi untuk Jackpot");
		showToast(notifList['noBetJP'][0], notifList['noBetJP'][1]);
		$("#bet").focus();
	} else {
		
		var win = parseFloat(document.getElementById("win3").value) || 0;
		win = win.toFixed(2);
		if (win > bet) {
			var showBMoney = endMoney - (win - bet);
		} else {
			var showBMoney = endMoney + (bet - win);
		}
		beginMoney = showBMoney;
		vTime.setTime(vTime.getTime() - (Math.floor(Math.random() * 8) + 40) * 1000);
		sTime = vTime.toLocaleDateString('en-CA', options).replace(",", "");
		const rowBet = `<tr class=\"tr_h\" data-classid=\"3\" data-linenum=\"25\" data-roundno=\"0\" data-tableid=\"0\" data-gamename=\"SeaWorld\" data-logtime=\"2024-11-11 03:10:56\" data-logstr=\"1.00,0.00,108.18,3,2,4,5,6,1,2,10,5,3,10,2,7,3,2,0.04,25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,2,0.00,0\" id=\"194710\"><td id=\"162\">${gameName}</td><td><span class=\"badge bg-gray\">0</span></td><td>${bet}</td><td>${win}</td><td>${showBMoney.toFixed(2)}</td><td>${endMoney.toFixed(2)}</td><td>${sTime}</td></tr>`;
		const rowJackpot = `<tr class=\"tr_h\" id=\"rowJackpot\"><td>${gameName}</td><td><span class=\"text-red text-bold\" id=\"setScore\">JackPot: ${win}</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td><span class=\"text-red text-bold\">-</span></td><td>${sTime}</td></tr>`;
		document.getElementById('tblData').insertAdjacentHTML('beforeend', rowBet);
		document.getElementById('tblData').insertAdjacentHTML('beforeend', rowJackpot);
		endMoney = beginMoney;
	}
}

$("#btnToggleSetScore").click(function(e){
	$("#rowSetScore1").toggle();
});
$("#vSetScore").keyup(function(event){
	if(event.keyCode == 13){
		$("#btnSetScore").click();
	}
});
$("#bet").keyup(function(event){
	if(event.keyCode == 13){
		$("#win1").focus();
	}
});
$("#win1").keyup(function(event){
	if(event.keyCode == 13){
		$("#btnAddBet").click();
		$("#win1").val("");
	}
});
$("#win2").keyup(function(event){
	if(event.keyCode == 13){
		$("#btnAddFree").click();
		$("#win2").val("");
	}
});
$("#win3").keyup(function(event){
	if(event.keyCode == 13){
		$("#btnAddJP").click();
		$("#win3").val("");
	}
});
//for (let i = 0; i < 50; i++) {
//	document.getElementById('tblData').insertAdjacentHTML('beforeend', betRow[Math.floor(Math.random() * betRow.length)]);
//}
//console.log(rowBet);
//console.log(rowFree);
//document.getElementById('tblData').insertAdjacentHTML('beforeend', rowBet);
//document.querySelectorAll("[id='162']").forEach(e => e.innerHTML = 'GreatBlue');
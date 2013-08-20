var TD = {};

TD.idList = [];
TD.extensionId = 'kkgmbidocfcnogfbcigoalnbjdfjaaia';
TD.TabDownHistory = {
	estensionId: extensionId,
	tabLists: []
};
TD.setTabHistory = function(){
	var addTabList = new TabList(winTabList);
	TD.TabDownHistory.tabLists.push(addTabList);
	localStorage.setItem('tabDownHistory', JSON.stringify(TabDownHistory));
};
TD.loadTabHistory = function(){
	return JSON.parse(localStorage.getItem('tabDownHistory'));
};
TD.manipulateTabs = function(){
	chrome.tabs.query({currentWindow: true}, function(winTabList) {
			var addTabList = new TabList(winTabList);
			TabDownHistory.tabLists.push(addTabList);
			localStorage.setItem('tabDownHistory', JSON.stringify(TabDownHistory));
			var newTab = chrome.tabs.create( { "url": "index.html" } );

			for(var i in winTabList){
				if(winTabList[i].active === false){
					idList.push(winTabList[i].id);
				}
			}
			chrome.tabs.remove(idList);
			idList = [];
			chrome.runtime.sendMessage({history: TabDownHistory}); /*Send a message to the content script*/
		});
};

var TabList = function(list){
	var self = this;
	self.date = new Date();
	self.formattedDate = this.formatDate(this.date);
	self.list = list;
	self.formatDate = function(date){
		var dayOfWeek = date.getDay(),
		month = date.getMonth(),
		dayInMonth = date.getDate(),
		year = date.getFullYear(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		cleanDayOfWeek = '',
		cleanMonth = '',
		cleanDayInMonth = dayInMonth,
		cleanYear = year,
		cleanHour = '',
		cleanMinute = minute,
		amOrPm = '';

		switch(dayOfWeek){
			case 0:
				cleanDayOfWeek = 'Sunday';
				break;
			case 1:
				cleanDayOfWeek = 'Monday';
				break;
			case 2:
				cleanDayOfWeek = 'Tuesday';
				break;
			case 3:
				cleanDayOfWeek = 'Wednesday';
				break;
			case 4:
				cleanDayOfWeek = 'Thursday';
				break;
			case 5:
				cleanDayOfWeek = 'Friday';
				break;
			case 6:
				cleanDayOfWeek = 'Saturday';
				break;
			default:
				console.log("Error parsing day of week");
				break;
		}

		switch(month){
			case 0:
				cleanMonth = 'January';
				break;
			case 1:
				cleanMonth = 'February';
				break;
			case 2:
				cleanMonth = 'March';
				break;
			case 3:
				cleanMonth = 'April';
				break;
			case 4:
				cleanMonth = 'May';
				break;
			case 5:
				cleanMonth = 'June';
				break;
			case 6:
				cleanMonth = 'July';
				break;
			case 7:
				cleanMonth = 'August';
				break;
			case 8:
				cleanMonth = 'September';
				break;
			case 9:
				cleanMonth = 'October';
				break;
			case 10:
				cleanMonth = 'November';
				break;
			case 11:
				cleanMonth = 'December';
				break;
			default:
				console.log("Error parsing month");
				break;
		}

		switch(hour){
			case 0:
				cleanHour = '12';
				amOrPm = 'am';
				break;
			case 1:
				cleanHour = '1';
				amOrPm = 'am';
				break;
			case 2:
				cleanHour = '2';
				amOrPm = 'am';
				break;
			case 3:
				cleanHour = '3';
				amOrPm = 'am';
				break;
			case 4:
				cleanHour = '4';
				amOrPm = 'am';
				break;
			case 5:
				cleanHour = '5';
				amOrPm = 'am';
				break;
			case 6:
				cleanHour = '6';
				amOrPm = 'am';
				break;
			case 7:
				cleanHour = '7';
				amOrPm = 'am';
				break;
			case 8:
				cleanHour = '8';
				amOrPm = 'am';
				break;
			case 9:
				cleanHour = '9';
				amOrPm = 'am';
				break;
			case 10:
				cleanHour = '10';
				amOrPm = 'am';
				break;
			case 11:
				cleanHour = '11';
				amOrPm = 'am';
				break;
			case 12:
				cleanHour = '12';
				amOrPm = 'pm';
				break;
			case 13:
				cleanHour = '1';
				amOrPm = 'pm';
				break;
			case 14:
				cleanHour = '2';
				amOrPm = 'pm';
				break;
			case 15:
				cleanHour = '3';
				amOrPm = 'pm';
				break;
			case 16:
				cleanHour = '4';
				amOrPm = 'pm';
				break;
			case 17:
				cleanHour = '5';
				amOrPm = 'pm';
				break;
			case 18:
				cleanHour = '6';
				amOrPm = 'pm';
				break;
			case 19:
				cleanHour = '7';
				amOrPm = 'pm';
				break;
			case 20:
				cleanHour = '8';
				amOrPm = 'pm';
				break;
			case 21:
				cleanHour = '9';
				amOrPm = 'pm';
				break;
			case 22:
				cleanHour = '10';
				amOrPm = 'pm';
				break;
			case 23:
				cleanHour = '11';
				amOrPm = 'pm';
				break;
		}

		if(cleanMinute.toString().length === 1){
			cleanMinute = '0' + cleanMinute.toString();
		}

		self.formattedDate = cleanDayOfWeek + ', ' + cleanMonth + ' ' + cleanDayInMonth + ', ' + cleanYear + '     ' + cleanHour + ':' + cleanMinute + ' ' + amOrPm;
	};

};


console.log("ooooooh", localStorage.getItem('tabDownHistory'));

chrome.browserAction.onClicked.addListener(function() {
	//When the plugin buttton is clicked, 
	//close all the tabs and
	//send a message to main.js with the history

	//If there is tab down history in local storage
	if(localStorage.getItem('tabDownHistory')){
		loadTabHistory();
		manipulateTabs();
	}
	//If no tab down history
	else{
		setTabHistory();
		manipulateTabs();
	}
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
// 	if(tabId === tab.id){
// 		chrome.runtime.sendMessage({history: TabDownHistory});
// 	}
// });


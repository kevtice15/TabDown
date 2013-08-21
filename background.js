var TD = {};

TD.idList = [];
TD.extensionId = 'ageddgpadfdjcnbojcjaaoclbcaoanno';
TD.tabDownHistory = {
	estensionId: TD.extensionId,
	tabLists: []
};

TD.getHistory = function(newList){
//If there is tab down history in local storage
	if(localStorage.getItem('tabDownHistory')){
		TD.tabDownHistory = JSON.parse(localStorage.getItem('tabDownHistory'));
	}

	TD.tabDownHistory.tabLists.push(new TD.TabList(newList));
	localStorage.setItem('tabDownHistory', JSON.stringify(TD.tabDownHistory));
};

TD.TabList = function(list){
	var self = this;
	self.date = new Date();
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

		return cleanDayOfWeek + ', ' + cleanMonth + ' ' + cleanDayInMonth + ', ' + cleanYear + ' ' + cleanHour + ':' + cleanMinute + ' ' + amOrPm;
	};
	self.formattedDate = self.formatDate(this.date);

};


console.log("ooooooh", localStorage.getItem('tabDownHistory'));

chrome.browserAction.onClicked.addListener(function() {
	//When the plugin buttton is clicked,
	//save the tabs, 
	//create the new tab,
	//close all the other tabs, and
	//send a message to main.js with the history
	chrome.tabs.query({currentWindow: true}, function(theTabs) {
		var newTabList = theTabs;
		var newTab = chrome.tabs.create( { "url": "index.html" } );
		for(var i in newTabList){
			TD.idList.push(newTabList[i].id);
		}
		chrome.tabs.remove(TD.idList);
		TD.idList = [];
		TD.getHistory(newTabList);
		chrome.runtime.sendMessage({history: TD.tabDownHistory}, function(response){
			console.log(response.farewell);
		});
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.title === 'TabDown'){
		chrome.runtime.sendMessage({history: TD.tabDownHistory}, function(response){
			console.log(response.farewell);
		});
	}
});


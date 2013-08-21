var g = {
	userHistory: {}
};
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse){
		var bkg = chrome.extension.getBackgroundPage();
		g.userHistory = request.history;
		console.log(typeof request.history, request.history);
		sendResponse({farewell: "goodbye"});
		setUpViewModel();
	}
);

function ViewModel(history){
	var self = this;
	self.history = history;
	self.reversed = ko.computed(function(){
		var reversedList = [];
		for(var i = self.history.tabLists.length - 1; i >= 0; i--){
			for(var j in self.history.tabLists[i].list){
				if(!self.history.tabLists[i].list[j].favIconUrl){
					self.history.tabLists[i].list[j].favIconUrl = '/icons/default.png';
				}
			}
			reversedList.push(self.history.tabLists[i]);
		}
		console.log('r', reversedList);
		return reversedList;
	});
	console.log("exe gets here");
}

function setUpViewModel(){
	console.log("1 Gdot", g.userHistory);
	ko.cleanNode(document.getElementsByTagName('html')[0]);
	console.log("2 Gdot", g.userHistory);
	var vm = new ViewModel(g.userHistory);
	ko.applyBindings(vm);
}

// function ViewModel(history){
// 	var self = this;
// 	self.history = ko.observable(history);
// }

// var vm = new ViewModel(userHistory);

var userHistory;
chrome.runtime.onMessage.addListener(
	function (request, sender){
		var bkg = chrome.extension.getBackgroundPage();
		userHistory = request.history;
		bkg.console.log(request.history);
	
		console.log(typeof request.history, request.history);

		function ViewModel(history){
			var self = this;
			self.reversed = reverseList(history.history.tabLists);
			console.log("exe gets here");
		}

		function reverseList(list){
			var reversedList = [];
			for(var i = list.length - 1; i >= 0; i--){
				reversedList.push(list[i]);
			}
			return reversedList;
		}
		var vm = new ViewModel({history: request.history});
		ko.applyBindings(vm);
	}
);

// function ViewModel(history){
// 	var self = this;
// 	self.history = ko.observable(history);
// }

// var vm = new ViewModel(userHistory);

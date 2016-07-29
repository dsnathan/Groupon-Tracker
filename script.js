var app = angular.module("GrouponTrackApp", ["ngRoute"]);

//config
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: 'homeCtrl'
	})
  //portal page
  $routeProvider.when("/portal",{
  	templateUrl: "templates/portal.html",
  	controller: 'portalCtrl'
  })
}); //end of config

var trackStatus = {};
//home page controller
app.controller("homeCtrl", function($scope,$location,$http,$window){
	$scope.findError= false;

var URL = "http://stormy-reaches-65962.herokuapp.com/?url=https://www.parcelninja.co.za/api/v1/tracking/";
 $scope.trackOrder = function(string) {
 	var finalUrl = URL + $scope.waybill + "/events";
 	console.log($scope.waybill);
 	$http({
		method: "GET",
		url: finalUrl,
		data :{
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'username': '0d4b1c4d-6dd0-4a75-9a0a-46e54be70b76',
		'Authorization': 'Basic 6aed16cf-f549-43d1-9f16-07056ea8b1a3',	
		'Access-Control-Allow-Origin': '*',
		}

	}).then(function(response){
		trackStatus = response.data; 
		if (trackStatus!== null && trackStatus.trackingNo === $scope.waybill) {
			console.log(response.data);
			$location.path("/portal");
		}
		else {
		// 	$scope.user.mobile="";
			$scope.findError = true; 
			$scope.waybill="";
		}
	});
 }
});


//portal page controller
app.controller("portalCtrl", function($scope,$location,$http,$window){
	if(!trackStatus.contactNo){
		$location.path("/");
	}

	$scope.orderImage = true;
	$scope.processImage = true;
	$scope.prepImage = true;
	$scope.transitImage = true;
	$scope.outImage = true;
	$scope.deliverImage = true;
	$scope.dateEst = "";
	$scope.courierDetail="";
	$scope.courierContact ="";

	//sorting estimated delivery date
  var year = trackStatus.estDeliveryEndDate.slice(0,4);
  var month = trackStatus.estDeliveryEndDate.slice(4,6);
  var day = trackStatus.estDeliveryEndDate.slice(6,8);
  var yearStamp = trackStatus.status.timeStamp.slice(0,4);
  var monthStamp = trackStatus.status.timeStamp.slice(4,6);
  var dayStamp = trackStatus.status.timeStamp.slice(6,8);
  

  //hovering effect 
  $scope.hover = function() {
  	$scope.orderedText = true;
  }
  $scope.hoverOver = function(){
  	$scope.orderedText = false;
  }

  $scope.processHover = function(){
  	$scope.processText = true;
  }
  $scope.processHoverOver = function(){
  	$scope.processText = false;
  }

  $scope.prepHover = function(){
  	$scope.prepText = true;
  }
  $scope.prepHoverOver = function(){
  	$scope.prepText = false;
  }

  $scope.transitHover = function(){
  	$scope.transitText = true;
  }
  $scope.transitHoverOver = function(){
  	$scope.transitText = false;
  }

  $scope.outHover = function(){
  	$scope.outText = true;
  }
  $scope.outHoverOver = function(){
  	$scope.outText = false;
  }

  $scope.delHover = function(){
  	if(trackStatus.status.description === "Pod Received" || trackStatus.status.description === "Delivered") {
  		$scope.deliverText= true;
	  	$scope.signedBy = trackStatus.signedBy;
  	}
  	else {
  		$scope.deliverSoonText = true; 
  	}
  }
  $scope.delHoverOver = function(){
  	$scope.deliverText = false;
  	$scope.deliverSoonText = false; 
  }

	//package ordered-->this generates new images to display when that event is happening

	if(trackStatus.status.description === "ordered") {
		$scope.firstStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.orderImage = false;
	}
	//package processing
	else if(trackStatus.status.description === "Waybill Imported") {//change the description later
		$scope.secondStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.processImage = false;
	}
	//packing preparing to ship
	else if(trackStatus.status.description === "On Manifest") {
		$scope.thirdStyle = {
			"background-color" : "blue",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.prepImage = false;
	}
	//package in transit
	else if(trackStatus.status.description === "Parcel Has Left Dawn Wing" || trackStatus.status.description === "Shipment Has Been Dispatched"){
		$scope.fourthStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.transitImage = false;
	}

	//package out for delivery
	else if(trackStatus.status.description === "On Trip"){ //change later
		$scope.sixthStyle = {
			"background-color" : "blue",
			"height" : "85px",
			"width" : "85px",
			"background-image" : "url(http://i346.photobucket.com/albums/p427/Andrew_Kwik/ordered_imageEDITED_zpsksnjzprl.png)",
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.outImage = false;
	}

	//package delivered 
	else if(trackStatus.status.description === "Pod Received" || trackStatus.status.description === "Delivered"){ 
		$scope.fifthStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = "Package delivered";
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.deliverImage = false;
	}
	else {
		$scope.thirdStyle = {
			"background-color" : "#48A431",
			"height" : "85px",
			"width" : "85px"
		}
		$scope.dateEst = day + "/" + month + "/" + year;
		$scope.currentTimeStamp = dayStamp + "/" + monthStamp + "/" + yearStamp;
		$scope.trackingNum = trackStatus.trackingNo;
		$scope.courierDetail= trackStatus.courier;
		$scope.courierContact = trackStatus.contactNo;
		$scope.prepImage = false;
	}
});




$(document).ready(function(){
	
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;
	var found = true;

	newGame();

	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemparature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You Won this game already! You need to start a new game.");
		};
  	});

	
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
	
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	function clearText() {
		$('#userGuess').val('');
	}

	function setCount(count) {
		$('#count').text(guessCount);
	}

	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ userChoice);
		return userChoice;
	}

	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	function checkTemparature(guessDifference) {

		if (guessDifference == 0) {
			setFeedback("Yay! You guessed it!!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("Your Guess is getting too hot!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("Your Guess is getting hot!");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("Your Guess is getting Warm!");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("Your Guess is getting cold!");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Your Guess is getting very cold!");
			return true;
		} else {
			setFeedback("Your Guess is freezing cold!");
			return true;
		}

	}

	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

});



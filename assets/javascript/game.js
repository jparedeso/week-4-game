toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

function Character(name, health, attack, counterAttack) {
	this.name = name;
	this.currentHealth = health;
	this.health = this.currentHealth;
	this.baseAttack = attack;
	this.newAttack = this.baseAttack;
	this.counterAttack = counterAttack;
		
		this.fight = function(power) {
			this.health -= power;

			if(this.health > 0) {
				this.newAttack += this.baseAttack;
				return true;
			}
			else {
				this.health = 0;
				return false;			
			}
		};
	}

$(function(){

	var obiWan = new Character("Obi-Wan Kenobi", 225, 11 ,22);
	var chewie = new Character("Chewbacca", 270, 9, 30);
	var darthVader = new Character("Darth Vader", 180, 12, 27);
	var hanSolo = new Character("Han Solo", 165, 21, 7);
	var myCharacters = [obiWan, chewie, darthVader, hanSolo];
	var currentCharacter;
	var opponent;
	var status = 0;
	var remainingOpponents = myCharacters.length -1;	
	
	$(".myImages").click(function() {
		
		if ($(this).attr("data-selected") === "false") {
			var selection = $(this).attr("data-myselection");			
			switch(status) {
				
				case 0:
					currentCharacter = myCharacters[parseInt(selection)];
					$("#myStatus").html("Prepare to fight.");
					$(this).attr("data-selected", "true");
					$("#current").html("<h3>Your Character</h3>");
					$("#current").append($(this));
					$("#stats" + selection).empty();
					status = 1;
					$("#myInstructions").text("Select your Opponent.");
					$("#currentStats").append("Health: " + currentCharacter.health);
					$("#currentStats").append("<br>Attack Power: " + currentCharacter.newAttack);
					$("#currentStats").append("<br>Counter Attack Power: " + currentCharacter.counterAttack);
					break;
				
				case 1:
					opponent = myCharacters[parseInt(selection)];
					$("#myStatus").html("Prepare to fight.");
					$(this).attr("data-selected", "true");
					$("#enemy").html("<h3>" + opponent.name + "</h3>");
					$("#enemy").append($(this));
					$("#stats" + selection).empty();
					status = 2;					
					$("#myInstructions").text("Attack your Opponent!");
					$("#enemyStats").append("Health: " + opponent.health);
					$("#enemyStats").append("<br>Attack Power: " + opponent.newAttack);
					$("#enemyStats").append("<br>Counter Attack Power: " + opponent.counterAttack);
					break;				
			}
		}
	});

	$("#atk").click(function() {
		if (status === 2) {
			var message = ("You attacked your opponent for " + currentCharacter.newAttack + " damage. ");
			if (!opponent.fight(currentCharacter.newAttack)) {
				message += (" Your opponent is dead. Select a new opponent.");

				$("#enemy").html("<h3>" + opponent.name + " is dead. Select a new Opponent.</h3>");
				$("#enemyStats").empty();

				remainingOpponents--;
				if (remainingOpponents <= 0 ) {
					status = 4;
					$("#enemy").html("<h3>No opponents left.</h3>");
					toastr["success"]("You Won! Press Restart to play again.");
				} else {
					status = 1;
					toastr["error"]("Select a new Opponent!");
				}
			} else {

				message += (opponent.name + " attacked you back for " + opponent.counterAttack + " damage.");

				if (!currentCharacter.fight(opponent.counterAttack)) {

					$("#" + currentCharacter.name).text("0");
					$("#" + currentCharacter.name).attr("style", "width: 0%");
					status = 3;
					message = "";
					toastr["error"]("You lost! Press Restart to play again.");
				
				} else {
					$("#currentStats").html("Health: " + currentCharacter.health);
					$("#currentStats").append("<br>Attack Power: " + currentCharacter.newAttack);
					$("#currentStats").append("<br>Counter Attack Power: " + currentCharacter.counterAttack);
					$("#enemyStats").html("Health: " + opponent.health);
					$("#enemyStats").append("<br>Attack Power: " + opponent.baseAttack);
					$("#enemyStats").append("<br>Counter Attack Power: " + opponent.counterAttack);
				}
			}
			$("#myStatus").html(message);
		} else if (status === 0) {
			toastr["error"]("You need to select a Character.");
		} else if (status === 1) {
			toastr["error"]("You need to select an Opponent.");
		}

	});

	$("#restart").click(function() {
		location.reload();
	});

});
// instruction (Lucyna)




// instruction-end


// game (Damian)





// game-end(Damian)



// score (Asia)

// pobranie  scoreboard z localstorage lub dodanie pustej tablicy
let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || []

// przygotowanie wyniku do dodania 
const getScore = (playerName, score) => {
 return {
	name: playerName,
	score
   }
}

// aktualizowanie scorbordu
let updatedScoreboard = [...scoreboard, getScore("Asia", 10)] 

//przygotowanie funkcji dodawania do localstorage
const addToScoreboard = (newScoreboard) => localStorage.setItem('scoreboard', JSON.stringify(newScoreboard))
//dodanie do localstorage
addToScoreboard(updatedScoreboard)



// score-end

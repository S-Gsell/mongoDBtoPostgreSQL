
import fs from "fs";
const detailedGameJSON = fs.readFileSync("./data/filteredGames.json");
const detailedGames = JSON.parse(detailedGameJSON).games;


//USE FOR TESTING PURPOSES ONLY
function resetDetailedGameData(){
    detailedGameJSON.games = [];
    writeToNewJSON();
}

function showDetailedData(){
    
    detailedGameJSON.games.forEach(game => {
        console.log(`NAME: ${game.name}`);
        console.log(`RATING: ${game.ratings?.esrb?.rating}`);
        console.log(`RELEASE: ${game.release_date.date}`);
        console.log(`PRICE: ${game.price_overview?.final_formatted}`);
        console.log(`HEADER IMAGE: ${game.header_image}`);
        console.log(`SCREENSHOT: ${game.screenshots[0]?.path_full}`);
        if(game.movies)
            console.log(`VIDEO: ${game.movies[0].webm.max}`);
        console.log("\n");
    });

    console.log(`TOTAL COUNT: ${detailedGames.length}`);
}

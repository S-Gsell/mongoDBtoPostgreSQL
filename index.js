import {connectToMongo, disconnectFromMongo, getCursor} from "./mongoConnection.js";
import { connectToPSQL, disconnectFromPSQL, idExists, isCategory } from "./postgresqlConnection.js";
import * as fs from "node:fs";


try{
    //connect to mongoDB and postgreSQL
    await connectToMongo();
    await connectToPSQL();

    const cursor = getCursor();
    let game;
    let alreadyAdded = [];
    //let testCount = 0;

    //write initial csv value
    fs.writeFile("output.csv", "game_game_id,categories_category_id\n", (err)=>{
        if(err)
            console.log("Error with initial CSV write");
    });
    
    //iterate through mongoDB
    while(game = await cursor.next()){
        //verify mongoDB data is in postgreSQL
        if(game.categories && !alreadyAdded.includes(game.steam_appid) && await idExists(game.steam_appid)){
            //iterate through present categories
            for(let i = 0; i < game.categories.length; i++){
                //Check if category is in gamepup db
                if(!(await isCategory(game.categories[i].id))){
                    continue;
                }

                //format csv content
                const content = `${game.steam_appid},${game.categories[i].id}\n`;
                //write to output file
                await fs.writeFile("output.csv", content, {flag: "a"}, (err) => {
                    if(err){
                        console.error(err);
                    }
                });  
            };
            alreadyAdded.push(game.steam_appid);
        }

        //testCount++;
        //if(testCount >= 10) break;
    }

}catch(e){
    throw e;
}finally{
    await disconnectFromMongo();
    await disconnectFromPSQL();
};
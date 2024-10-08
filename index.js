import {connectToMongo, disconnectFromMongo, getCursor} from "./mongoConnection.js";
import { connectToPSQL, disconnectFromPSQL, idExists } from "./postgresqlConnection.js";


try{
    //connect to mongoDB and postgreSQL
    await connectToMongo();
    await connectToPSQL();

    console.log(await idExists(253920));
    console.log(await idExists(67));

    //iterate through mongoDB
    const cursor = getCursor();
    let game;
    let testCount = 0;
    while(game = await cursor.next()){
        for(let i = 0; i < game.categories.length; i++){
            if(await idExists(game.steam_appid)){
                console.log(`game_id: ${game.steam_appid} | category_id: ${game.categories[i].id}`);
            }   
        };
        console.log("");
        testCount++;

        if(testCount >= 10)
            break;
    }

}catch(e){
    console.error(e);
}finally{
    await disconnectFromMongo();
    await disconnectFromPSQL();
};
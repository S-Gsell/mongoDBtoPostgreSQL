import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const gamesDB = client.db("GamePup").collection("games");

function getCursor(){
    let games = gamesDB.find({});

    return games;
}

async function connectToMongo(){
    try{
        await client.connect().then(resp => {
            console.log("Connected to MongoDB");
        });

    }catch(e){
        console.error("Failed to connect to MongoDB");
        console.error(e);
    }
}

async function disconnectFromMongo(){
    try{
        await client.close().then(resp => {
            console.log("Disconnected from MongoDB");
        });
    }catch(e){
        console.error("Failed to disconnect from MongoDB");
    }
}


export {connectToMongo, disconnectFromMongo, getCursor};

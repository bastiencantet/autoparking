import {WebSocket, WebSocketServer} from 'ws';
import {
    ClientCheckin,
    ClientType,
    Controller,
    MessageInterface,
    OKStep,
    SendNewSchedule,
    Station,
    Train,
    TrainArrival, TrainDeparture,
    ValidateCheckin
} from "./src/types/types";
import {handleCheckin} from "./src/handling/checkin";
import {handleArrival} from "./src/handling/arrival";
import {handleDeparture} from "./src/handling/departure";

const wss = new WebSocketServer({ port: 8080 });

const complexes = new Map<string, Map<Station, WebSocket>>();

const trains = new Map<string, Train>();

// On new client connection
wss.on('connection', (ws: WebSocket) => {
    console.log('A new client connected.');


    // Listen for messages from the client (optional)
    ws.on('message', (message: string) => {
        //get the JSON object from the client
        const obj : MessageInterface = JSON.parse(message);
        //handle different types of messages
        switch(obj.type){
            case 'checkin':
                handleCheckin(ws, obj as ClientCheckin, complexes);
                break;
            case 'okStep':
            case 'arrival':
                handleArrival(ws, obj as TrainArrival, complexes);
                break
            case 'departure':
                handleDeparture(ws, obj as TrainDeparture, complexes);
                break;

        }

    });

    ws.on('close', () => {
        console.log('Client disconnected.');

        complexes.forEach((stationsMap, complexId) => {
            stationsMap.forEach((stationWs, station) => {
                // Check if the WebSocket matches the disconnected client
                if (stationWs === ws) {
                    stationsMap.delete(station);
                    console.log(`Station ${station.id} removed from complex ${complexId}`);
                }
            });
        });

    });
});

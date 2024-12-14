import {SendNewSchedule, Station, TrainArrival} from "../types/types";
import {getStationByWs} from "../helpers/station-helpers";
import {WebSocket} from "ws";
import {Schedule, TrainSchedule} from "../classes/train-schedule";

export const handleArrival = (ws : WebSocket, arrival : TrainArrival, complexes : Map<string, Map<Station, WebSocket>>) => {
    const complexStations = complexes.get(arrival.complexId);
    if (!complexStations) {
        console.log('Complex not found');
        return;
    }
    const station = getStationByWs(complexStations, ws);
    if (!station) {
        console.log('Station not found');
        return;
    }

    station.train = {
        name: arrival.trainId,
        schedule: arrival.schedule as unknown as Schedule,
    };
    if (station.master) {
        let newStation: Station | undefined = undefined;
        for (const [s, socket] of complexStations) {
            if (!s.master && s.available) {
                newStation = s;
                break;
            }
        }
        if (!newStation) {
            console.log('No available station found');
            return;
        }
        newStation.available = false;
        newStation.train = {
            name: arrival.trainId,
            schedule: arrival.schedule as unknown as Schedule,
        };
        const trainSchedule = new TrainSchedule(false)
        trainSchedule.addEntry(
            trainSchedule.createDestinationInstruction(newStation.id),
            [[]]
        );

        const toSend: SendNewSchedule = {
            type: 'schedule',
            schedule: trainSchedule.getSchedule(),
        };
        console.log('Sending new schedule: ', toSend.schedule);
        ws.send(JSON.stringify(toSend));
    } else {
        station.available = false;
    }
};

import {getStationByWs} from "../helpers/station-helpers";
import {Station, TrainDeparture} from "../types/types";
import {WebSocket} from "ws";

export const handleDeparture = (ws : WebSocket, departure : TrainDeparture, complexes : Map<string, Map<Station, WebSocket>>) => {
    //the departure message is send a station when the train is leaving

    const complexStations = complexes.get(departure.complexId);
    if (!complexStations) {
        console.log('Complex not found');
        return;
    }
    const station = getStationByWs(complexStations, ws)
    if (!station) {
        console.log('Station not found');
        return;
    }
    station.train = undefined;
    station.available = true;
    console.log(`Train left station ${station.id}`);
}

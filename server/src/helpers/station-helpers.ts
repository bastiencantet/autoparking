import {Station} from "../types/types";
import { WebSocketServer, WebSocket } from 'ws';

export function getStationById(map: Map<Station, WebSocket>,id : string): Station | undefined {
    for (const [station, socket] of map) {
        if (station.id === id) {
            return station;
        }
    }
    return undefined;
}

export function getStationByWs(map: Map<Station, WebSocket>, ws: WebSocket): Station | undefined {
    for (const [station, socket] of map) {
        if (socket === ws) {
            return station;
        }
    }
    return undefined;
}

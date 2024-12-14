import {ClientCheckin, ClientType, Controller, Station, ValidateCheckin} from "../types/types";
import {WebSocket} from "ws";

export const handleCheckin = (ws : WebSocket, checkin : ClientCheckin , complexes : Map<string, Map<Station, WebSocket>>,) => {
    const station = {
        id: checkin.uid,
        master : checkin.master,
        complexId: checkin.complexId,
        train: undefined,
        available: true,
    };

  if (checkin.kind === ClientType.station) {
        if (!complexes.has(checkin.complexId)) {
            complexes.set(checkin.complexId, new Map());
        }
        complexes.get(checkin.complexId)?.set(station, ws);
        console.log('A new station checked in:', checkin);
    } else {
        console.log('Invalid client type during check-in:', checkin);
        return;
    }

    const validateCheckin: ValidateCheckin = {
        type: 'validate',
        uid: checkin.uid,
        complexId: checkin.complexId,
    };
    ws.send(JSON.stringify(validateCheckin));
};

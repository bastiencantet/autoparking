import {SendAssemblySignal, SendRedstoneSignal, Train, TrainWagon} from "./types/types";
import { WebSocket } from 'ws';
import {
    sendAssemblySignal,
    sendFluidSignal,
    sendMoveArmSignal,
    sendRedstoneSignal,
    sendStickPayloadSignal
} from "./helpers/websocket";




export function initTrainStepTable(wagon: TrainWagon) : Map<number, (ws: WebSocket, controllerWs: WebSocket) => void>{
    const trainStepTable = new Map<number, (ws: WebSocket, controllerWs: WebSocket) => void>()
    if (wagon.payloadType === 'cargo') {
        /*trainStepTable.set(1, (ws, controllerWs) => {
            console.log('Step 1');
            sendAssemblySignal(ws, false);
        })
        trainStepTable.set(2, (ws, controllerWs) => {
            console.log('Step 2');
            sendMoveArmSignal(controllerWs, 'y', false);
        })
        trainStepTable.set(3, (ws, controllerWs) => {
            console.log('Step 3');
            setTimeout(() => {
                sendStickPayloadSignal(controllerWs, true);
            } , 1000);
        })
        trainStepTable.set(4, (ws, controllerWs) => {
            console.log('Step 4');
            setTimeout(() => {
            sendMoveArmSignal(controllerWs, 'y', true);
            }, 1000);
        })
        trainStepTable.set(5, (ws, controllerWs) => {
            console.log('Step 5');
            sendAssemblySignal(ws, true);
        })
        trainStepTable.set(6, (ws, controllerWs) => {
            setTimeout(() => {
            sendRedstoneSignal(ws, true);
            } , 1000);
        }*/
    }
    if (wagon.payloadType === 'fluid') {
        trainStepTable.set(1, (ws, controllerWs) => {
            setTimeout(() => {
                console.log('Step 1');
                sendFluidSignal(controllerWs, true, wagon.payloadName);
            }, 1000);
        })
        trainStepTable.set(2, (ws, controllerWs) => {
            console.log('Step 2');
            setTimeout(() => {
                sendFluidSignal(controllerWs, false, wagon.payloadName);
            }, 10000);
        })
        trainStepTable.set(3, (ws, controllerWs) => {
            console.log('Step 3');
            setTimeout(() => {
                sendRedstoneSignal(ws, true);
            }, 1000);
        })
    }
    return trainStepTable;
}

export function doStationAction(ws: WebSocket, train : Train, controllerWs: WebSocket) {
}

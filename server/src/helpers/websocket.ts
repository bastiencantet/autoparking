import {
    MoveArm,
    SendAssemblySignal,
    SendFluidSignal,
    SendPayloadSignal,
    SendRedstoneSignal,
    StickPayload
} from "../types/types";
import {WebSocket} from 'ws';

export function sendAssemblySignal(ws: WebSocket, state: boolean) {
    const signal: SendAssemblySignal = {
        type: 'assembly',
        state,
    };
    ws.send(JSON.stringify(signal));
}

export function sendRedstoneSignal(ws: WebSocket, signal: boolean) {
    const signalToSend: SendRedstoneSignal = {
        type: 'redstone',
        signal,
    };
    ws.send(JSON.stringify(signalToSend));
}

export function sendPayloadStateSignal(ws: WebSocket, state: boolean) {
    const signal: SendPayloadSignal = {
        type: 'payload',
        state,
    };
    ws.send(JSON.stringify(signal));
}

export function sendMoveArmSignal(ws: WebSocket, axis: string, up: boolean) {
    const signal: MoveArm = {
        type: 'move',
        up: up,
        axis,
    };
    ws.send(JSON.stringify(signal));
}

export function sendStickPayloadSignal(ws: WebSocket, state: boolean) {
    const signal: StickPayload = {
        type: 'stick',
        state,
    };
    ws.send(JSON.stringify(signal));
}

export function sendFluidSignal(ws: WebSocket, state: boolean, kind: string) {

    const signal: SendFluidSignal = {
        type: 'fluid',
        kind,
        state
    }
    ws.send(JSON.stringify(signal));
}

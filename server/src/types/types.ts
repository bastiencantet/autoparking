import {Schedule, TrainSchedule} from "../classes/train-schedule";
import {WebSocket} from "ws";

export interface MessageInterface {
    type: string;
}


export interface MovementCommand {
    type: 'move';
    x: number;
    y: number;
    z: number;
}

export enum ClientType {
    'station' = 'station',
    'controller' = 'controller',
}

export type Station = {
    id: string;
    complexId: string;
    master: boolean;
    train: Train | undefined;
    available: boolean;
}

export type Controller = {
    id: string;
    complexId: string;
    ws: WebSocket;
    actualStation: Station | undefined;
}

export interface ClientCheckin {
    type: 'checkin';
    kind: ClientType;
    master: boolean;
    uid: string;
    complexId: string;
}

export interface ValidateCheckin {
    type: 'validate';
    uid: string;
    complexId: string;
}

export interface OKStep {
    type: 'okStep';
    stationId: string | null | undefined ;
    controllerId : string | null | undefined;
    complexId: string;
}

export interface TrainArrival {
    type: 'arrival';
    trainId: string;
    stationId: string;
    complexId: string;
    schedule: string;
}

export interface TrainDeparture {
    type: 'departure';
    stationId: string;
    complexId: string;
}

export type TrainWagon = {
    payloadName: string;
    payloadType: string;
}

export type Train = {
    name: string | null;
    schedule: Schedule;
}

export interface SendNewSchedule {
    type: 'schedule';
    schedule: Schedule;
}


export interface SendRedstoneSignal {
    type: 'redstone';
    signal: boolean;
}

export interface SendAssemblySignal {
    type: 'assembly';
    state: boolean;
}

export interface SendPayloadSignal {
    type: 'payload';
    state: boolean;
}

export interface StickPayload {
    type: 'stick';
    state: boolean;
}

export interface MoveArm {
    type: 'move';
    axis: string;
    up: boolean;
}

// Fluid Controller Types
export interface SendFluidSignal {
    type: 'fluid';
    kind: string;
    state: boolean;
}

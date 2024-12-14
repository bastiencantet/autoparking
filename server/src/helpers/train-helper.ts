import {TrainWagon} from "../types/types";

export function getTrainInfoWithId(trainId: string): {trainType: string, nbWagons: number, payloadType: string[]}  {
    // trainId format: <name>-<nbWagons>-<type>-<payloadType>

    let trainType = 'cargo';
    let nbWagons = 0;
    let payloadType = [];

    //check if the format is correct
    if (trainId.split('-').length !== 4) {
        return {
            trainType,
            nbWagons,
            payloadType: []
        }
    }
    nbWagons = parseInt(trainId.split('-')[1]);
    if (trainId.split('-')[2] === 'FL') {
        trainType = 'fluid';
    }

    const payloads = trainId.split('-')[3];
    //payload is like [NAP/NAF] return an array with NAP  NAF
    if (payloads.includes('/')) {
        payloadType = payloads.split('/');
    } else {
        payloadType.push(payloads);
    }
    return {
        trainType,
        nbWagons,
        payloadType
    }
}

export function createWagonsObject(trainId: string): TrainWagon[] {
    const trainInfo = getTrainInfoWithId(trainId);
    const splitNumber = trainInfo.nbWagons / trainInfo.payloadType.length;
    const wagons = [];
    for (let i = 0; i < trainInfo.nbWagons; i++) {
        wagons.push({
            payloadName: trainInfo.payloadType[i % trainInfo.payloadType.length],
            payloadType: trainInfo.trainType
        });
    }
    return wagons;
}

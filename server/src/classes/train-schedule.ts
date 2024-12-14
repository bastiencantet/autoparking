// Interfaces for Instructions and Conditions
interface Instruction {
    id: string;
    data: Record<string, any>;
}

interface Condition {
    id: string;
    data: Record<string, any>;
}

// Entry in the schedule, consisting of an instruction and its related conditions
interface Entry {
    instruction: Instruction;
    conditions: Condition[][];
}

// Full Schedule Interface
export interface Schedule {
    cyclic: boolean;
    entries: Entry[];
}

// TrainSchedule Class
export class TrainSchedule {
    schedule: Schedule;

    constructor(cyclic: boolean = true) {
        this.schedule = {
            cyclic,
            entries: [],
        };
    }

    // Add an entry to the schedule with an instruction and its conditions
    addEntry(instruction: Instruction, conditions: Condition[][]) {
        const entry: Entry = { instruction, conditions };
        this.schedule.entries.push(entry);
    }

    // Retrieve the entire schedule
    getSchedule() {
        return this.schedule;
    }

    // Helper methods to create specific instructions
    createDestinationInstruction(stationName: string): Instruction {
        return {
            id: "create:destination",
            data: { text: stationName },
        };
    }

    createRenameInstruction(newName: string): Instruction {
        return {
            id: "create:rename",
            data: { text: newName },
        };
    }

    createThrottleInstruction(throttleValue: number): Instruction {
        return {
            id: "create:throttle",
            data: { value: throttleValue },
        };
    }

    // Helper methods to create specific conditions
    createDelayCondition(value: number, timeUnit: number): Condition {
        return {
            id: "create:delay",
            data: { value, time_unit: timeUnit },
        };
    }

    createTimeOfDayCondition(hour: number, minute: number, rotation: number): Condition {
        return {
            id: "create:time_of_day",
            data: { hour, minute, rotation },
        };
    }

    createPoweredCondition(): Condition {
        return {
            id: "create:powered",
            data: {},
        };
    }

    loadSchedule(schedule: Schedule) {
        this.schedule = schedule;
    }

}

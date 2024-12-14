local peripheralObj = peripheral.wrap("left")
local serverUrl = "ws://localhost:8080"

-- The ID of this station and complex (change these as needed)
local clientUid = peripheralObj.getStationName()  -- The station ID, adjust to real ID
local complexId = "complex-001"
local trainID = ""

--

local switcher = true
local dissasemble = false


-- Function to send check-in message
local function sendCheckin(ws, uid, complexId)
    local checkinMessage = {
        type = "checkin",
        uid = uid,
        complexId = complexId,
        kind = "station",  -- Assuming the kind is always 'station' for this client
        master = false
    }
    ws.send(textutils.serializeJSON(checkinMessage))

end

local function sendOkStep(ws)
    local okStepMessage = {
        type = "okStep",
        complexId = complexId,
        stationId = clientUid
    }
    ws.send(textutils.serializeJSON(okStepMessage))
    print("OkStep sent:", textutils.serializeJSON(okStepMessage))
end


-- Function to handle train arrival message
local function sendArrival(ws, trainId)
    if (peripheralObj.hasSchedule()) then
        schedule = peripheralObj.getSchedule()
    else
        schedule = {}
    end
    local arrivalMessage = {
        type = "arrival",
        trainId = trainId,
        complexId = complexId,
        stationId = clientUid,
    }
    ws.send(textutils.serializeJSON(arrivalMessage))
end

local function sendDeparture(ws)
    local departureMessage = {
        type = "departure",
        complexId = complexId,
        stationId = clientUid
    }
    ws.send(textutils.serializeJSON(departureMessage))
end


local function connectToServer(url)
    -- CC::Tweaked WebSocket client Async API
    if (not http) then
        print("HTTP API is disabled, please enable it in ComputerCraft config")
        return
    end
    if (not http.websocket) then
        print("This version of ComputerCraft does not support WebSocket client")
        return
    end
    local ws = http.websocket(url)
    print("Connecting to the server:", url)
    if (not ws) then
        print("Failed to connect to the server:", url)
        return
    end
    print("Connected to the server:", url)
    sendCheckin(ws, clientUid, complexId, stationPosition)
    return ws
end

-- Connect to the WebSocket server
local wsClient = connectToServer(serverUrl)
if (not wsClient) then
    return
end



local function trainStationLoop()
    while true do
        local train = peripheralObj.isTrainPresent()
        if (train and switcher and not dissasemble) then
            local name = peripheralObj.getTrainName()
            print("Train arrived: ", name)
            sendArrival(wsClient, name)
            switcher = false
        end
        if (not train) then
            if (not switcher) then
                print("Train departed")
                sendDeparture(wsClient)
                switcher = true
            end
            dissasemble = false

        end
        os.sleep(1)
    end
end

-- do actions depending on the message type
local function treatMessage(message)
    local messageObj = textutils.unserializeJSON(message)
    if (messageObj.type == "validate") then
        print("Received validate message:", message)
    end
    if (messageObj.type == "schedule") then
        print("Received schedule message:", messageObj.schedule)
        peripheralObj.setSchedule(messageObj.schedule)
    end
    if (messageObj.type == "redstone") then
        print("Received redstone message:", messageObj.signal)
        redstone.setOutput('left', messageObj.signal)
        sendOkStep(wsClient)
        sleep(1)
        redstone.setOutput('left', not messageObj.signal)
    end
    if  (messageObj.type == "assembly") then
        print("Received assembly message:", messageObj.state)
        local trainId = "";
        if (messageObj.state) then
            peripheralObj.assemble();
            else
            peripheralObj.disassemble();
            dissasemble = true
        end
        sendOkStep(wsClient)
    end
    if (messageObj.type == "payload") then
        print("Received payload message:", messageObj.payload)
    end
end


local function handleMessages()
    while true do
        local message = wsClient.receive()
        if (message) then
            treatMessage(message)
        end
        os.sleep(0.1)
    end
end



parallel.waitForAny(trainStationLoop, handleMessages)

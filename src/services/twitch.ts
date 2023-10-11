// deno-lint-ignore-file

import * as tmi from 'tmi.js'
import { IClient } from '../interfaces/twitch.ts'

const client = new tmi.Client({
    identity: {
        username: Deno.env.get("TWITCH_USERNAME")!,
        password: Deno.env.get("TWITCH_PASSWORD")!,
    },
    channels: [ "#" + Deno.env.get("TWITCH_CHANNEL")! ],
    options: {
        debug: Deno.env.get("DEBUG")! == "true" ? true : false
    },
    connection: {
        reconnect: true,
        secure: true
    }
})

/**
 * Connect Twitch Client
 */
const connect = async () => {
    client.connect().then(() => {
        client.on("chat", (channel, userstate, commandMessage, self) => chatMessageData(client, { channel, userstate, commandMessage, self }))
        console.log("[StreamBot] Connected to twitch.tv")
    })
}

/**
 * Structure message data and check commands
 *
 * @param {*} client
 * @param {IClient} data
 */
const chatMessageData = (client: any, data: IClient) => {

    //console.log(data)

    //console.log(`${data.userstate["display-name"]}: ${data.commandMessage}`)

    if(data.commandMessage == "!ping") {
        client.say(Deno.env.get("TWITCH_CHANNEL")!, "pong!")
    }
    
}

export {
    connect
}
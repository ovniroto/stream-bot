// deno-lint-ignore-file

import * as tmi from 'tmi.js'
import { ITwitchChat, ITwitchChatData, ITwitchClient } from '@/interfaces/twitch.ts'
import * as commandService from '@/services/commands.ts'

const load = async () => {

    const client = new tmi.Client({
        identity: {
            username: Deno.env.get("TWITCH_USERNAME")!,
            password: "oauth:" + Deno.env.get("TWITCH_ACCESS_TOKEN")!,
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

    client.connect().then(() => {
        client.on("chat", async (channel, userstate, commandMessage, self) => await chatMessageData(client, { channel, userstate, commandMessage, self }))
        console.log("[StreamBot] Connected to twitch.tv")
    })
}

const chatMessageData = async (client: ITwitchClient, data: ITwitchChatData) => {

    if(data.self) return

    const chat: ITwitchChat = {
        channel: data.channel,
        user: {
            id: data.userstate["user-id"],
            isBroadcaster: data.userstate.badges?.broadcaster == "1" ? true : false,
            isVip: data.userstate.badges?.vip == "1" ? true : false,
            isMod: data.userstate.mod ? true : false,
            isSub: data.userstate.subscriber ? true : false,
            subcount: data.userstate.subscriber ? data.userstate.badges?.subscriber : null,
            firstmsg: data.userstate["first-msg"],
            namecolor: data.userstate.color,
            username: data.userstate.username,
            displayname: data.userstate["display-name"],
        },
        message: {
            text: data.commandMessage.split(" ").slice(1).join(" "),
            isCommand: data.commandMessage.startsWith("!"),
            command: data.commandMessage.startsWith("!") ? data.commandMessage.trim().split(" ")[0].substring(1) : null,
            arguments: data.commandMessage.startsWith("!") ? data.commandMessage.trim().split(" ") : null
        }
    }

    if(chat.message.isCommand && chat.message.command) {
        const command = await commandService.get(chat.message.command)
        if(command) return await commandService.execute(command, chat, client, "twitch")
    }
    
}

const sendChatMessage = async (client: ITwitchClient, channel: string, message: string) => {
    client.say(channel, message)
}

export {
    load,
    sendChatMessage
}
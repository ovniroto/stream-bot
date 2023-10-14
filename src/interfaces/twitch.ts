// deno-lint-ignore-file
import * as tmi from 'tmi.js'

export type ITwitchClient = tmi.Client

export interface ITwitchChatData {
    channel: string
    userstate: tmi.ChatUserstate
    commandMessage: string
    self: boolean
}

export interface ITwitchChat {
    channel: string
    user: {
        id: string | undefined
        isBroadcaster: boolean
        isVip: boolean
        isMod: boolean
        isSub: boolean
        subcount: string | null | undefined
        firstmsg: boolean
        namecolor: string | undefined
        username: string | undefined
        displayname: string | undefined
    },
    message: {
        text: string
        isCommand: boolean
        command: string | null
        arguments: string[] | null
    }
}
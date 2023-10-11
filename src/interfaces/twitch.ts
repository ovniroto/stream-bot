// deno-lint-ignore-file
import * as tmi from 'tmi.js'

export interface IClient {
    channel: string
    userstate: tmi.ChatUserstate
    commandMessage: string
    self: boolean
}
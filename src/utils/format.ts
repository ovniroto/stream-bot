// deno-lint-ignore-file

import { ICommand } from '@/interfaces/commands.ts'
import { ITwitchChat } from '@/interfaces/twitch.ts'

export const formatResponse = (string: string, command: ICommand, chat: ITwitchChat) => {

    string = string.replaceAll("{user}", chat.user.username as string)

    string = string.replaceAll(`/\{(\d+):(\d+)\}/g`, function (_match, min, max) {
        min = parseInt(min, 10)
        max = parseInt(max, 10)
        return (Math.floor(Math.random() * (max - min + 1)) + min) as unknown as string
    })

    string = string.replaceAll(`/\{max:(\d+)\}/g`, function (_match, max) {
        max = parseInt(max, 10)
        return (Math.floor(Math.random() * (max - 1 + 1)) + 1) as unknown as string
    })

    string = string.replaceAll(`/\{min:(\d+)\}/g`, function (_match, min) {
        min = parseInt(min, 10)
        return (Math.floor(Math.random() * (9999999 - min + 1)) + min) as unknown as string
    })

    string = string.replace("{random}", (Math.floor(Math.random() * (9999999 - 1 + 1)) + 1) as unknown as string)

    string = string.replace("{percent}", (Math.floor(Math.random() * (100 - 1 + 1)) + 1) as unknown as string)

    return string

}
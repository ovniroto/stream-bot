// deno-lint-ignore-file

import { ICommandPlatform, ICommandDatabase } from '@/interfaces/commands.ts'
import { ICommandChat, ICommandClient } from '@/interfaces/commands.ts'
import { formatResponse } from '@/utils/format.ts'

const randomNumberCommand = async (command: ICommandDatabase, chat: ICommandChat, client: ICommandClient, platform: ICommandPlatform) => {

    const min = command.value.number?.min as number
    const max = command.value.number?.max as number

    const number = (Math.floor(Math.random() * (max - min + 1)) + min) as unknown as string
    const username = chat.user.username as string

    const response = formatResponse(command.value.response as string, { username, number })

    if(platform === "twitch") return client.say(chat.channel, response)

}

export default randomNumberCommand
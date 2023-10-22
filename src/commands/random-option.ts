// deno-lint-ignore-file

import { ICommandPlatform, ICommandDatabase } from '@/interfaces/commands.ts'
import { ICommandChat, ICommandClient } from '@/interfaces/commands.ts'
import { formatResponse } from '@/utils/format.ts'

const randomOptionCommand = async (command: ICommandDatabase, chat: ICommandChat, client: ICommandClient, platform: ICommandPlatform) => {

    const min = command.value.number?.min as number
    const max = command.value.number?.max as number

    const options = command.value?.options as string[]

    const optionSelected = options[Math.floor(Math.random() * options.length)]

    const response = formatResponse(command.value.response as string, command.value, chat) + " " + optionSelected

    if(platform === "twitch") return client.say(chat.channel, response)

}

export default randomOptionCommand
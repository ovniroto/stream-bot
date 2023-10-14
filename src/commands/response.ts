// deno-lint-ignore-file

import { ICommandPlatform, ICommandDatabase } from '@/interfaces/commands.ts'
import { ICommandChat, ICommandClient } from '@/interfaces/commands.ts'

const responseCommand = async (command: ICommandDatabase, chat: ICommandChat, client: ICommandClient, platform: ICommandPlatform) => {

    const commandData = command.value

    if(platform === "twitch") return client.say(chat.channel, commandData.response as unknown as string)

}

export default responseCommand
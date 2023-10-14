// deno-lint-ignore-file

import { ICommandPlatform, ICommandDatabase } from '../interfaces/commands.ts'
import { IChat, IClient } from '../interfaces/twitch.ts'

const responseCommand = async (command: ICommandDatabase, chat: IChat, client: IClient, platform: ICommandPlatform) => {

    const commandData = command.value

    if(platform === "twitch") return client.say(chat.channel, commandData.content as unknown as string)

}

export default responseCommand
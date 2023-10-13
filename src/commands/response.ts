// deno-lint-ignore-file

import { ICommandPlatform, IDatabaseCommand } from '../interfaces/commands.ts'
import { IChat, IClient } from '../interfaces/twitch.ts'

const responseCommand = async (command: IDatabaseCommand, chat: IChat, client: IClient, platform: ICommandPlatform) => {

    const commandData = command.value

    if(platform === "twitch") return client.say(chat.channel, commandData.content as unknown as string)

}

export default responseCommand
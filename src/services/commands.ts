import * as commandModel from '../models/command.ts'
import { ICommand, ICommandPlatform, ICommandDatabase } from '../interfaces/commands.ts'
import { IChat, IClient } from '../interfaces/twitch.ts'

import responseCommand from '../commands/response.ts'
import randomNumberCommand from '../commands/random-number.ts'
import randomOptionCommand from '../commands/random-option.ts'
import chatGPTCommand from '../commands/chatgpt.ts'
import chatGPTModCommand from '../commands/chatgpt-mod.ts'
import ttsCommand from '../commands/tts.ts'
import ttsModCommand from '../commands/tts-mod.ts'

const get = async (name: string) => {
    const command = await commandModel.get(name)
    if(!command.versionstamp) return await getCommandByAlias(name)
    return command
}

const getAll = async () => {
    return await commandModel.getAll()
}

const getCommandByAlias = async (name: string) => {
    const commands = await getAll()
    const aliasCommand = commands.filter((command: ICommandDatabase) => command.value.alias.find(alias => alias === name))
    if(!aliasCommand[0]) return undefined
    return aliasCommand[0]
}

const create = async (data: ICommand) => {
    await commandModel.create(data.name, data)
}

const execute = async (command: ICommandDatabase, chat: IChat, client: IClient, platform: ICommandPlatform) => {

    const commandData = command.value

    if(commandData.type == 'response') return await responseCommand(command, chat, client, platform)

    if(commandData.type == 'random-number') return await randomNumberCommand(command, chat, client, platform)
    if(commandData.type == 'random-option') return await randomOptionCommand(command, chat, client, platform)

    if(commandData.type == 'chatgpt') return await chatGPTCommand(command, chat, client, platform)
    if(commandData.type == 'chatgpt-mod') return await chatGPTModCommand(command, chat, client, platform)

    if(commandData.type == 'tts') return await ttsCommand(command, chat, client, platform)
    if(commandData.type == 'tts-mod') return await ttsModCommand(command, chat, client, platform)

}

const disable = async (name: string): Promise<Deno.KvCommitResult> => {
    const command = await get(name) as unknown as ICommandDatabase
    command.value.disabled = true
    return await commandModel.update(name, command.value)
}

const enable = async (name: string): Promise<Deno.KvCommitResult> => {
    const command = await get(name) as unknown as ICommandDatabase
    command.value.disabled = false
    return await commandModel.update(name, command.value)
}

export {
    get,
    create,
    execute,
    enable,
    disable
}
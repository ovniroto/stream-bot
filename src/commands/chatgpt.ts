// deno-lint-ignore-file

import * as chatgpt from '../services/openai.ts'
import { ICommandPlatform, IDatabaseCommand } from '../interfaces/commands.ts'
import { IChat, IClient } from '../interfaces/twitch.ts'

const chatGPTCommand = async (command: IDatabaseCommand, chat: IChat, client: IClient, platform: ICommandPlatform) => {

    const args = chat.message.arguments as unknown as string[]

    if(!args[1]) return client.say(chat.channel, "🤖 ChatGPT: Write a message first!")

    const prompt = chat.message.text
    const model = command.value.chatgpt?.model as unknown as string
    const temperature = command.value.chatgpt?.temperature as unknown as number
    const maxTokens = command.value.chatgpt?.maxTokens as unknown as number

    const response = await chatgpt.request(prompt, model, temperature, maxTokens)

    if(platform === "twitch") return client.say(chat.channel, "🤖 ChatGPT: " + response as unknown as string)

}

export default chatGPTCommand
import * as chatgpt from '@/services/openai.ts'
import { ICommandPlatform, ICommandDatabase } from '@/interfaces/commands.ts'
import { IChat, IClient } from '@/interfaces/twitch.ts'
import * as langService from "@/services/language.ts"

const chatGPTCommand = async (command: ICommandDatabase, chat: IChat, client: IClient, platform: ICommandPlatform) => {

    const lang = await langService.get()

    const username = "@" + chat.user.username
    const args = chat.message.arguments as unknown as string[]

    if(!args[1]) return client.say(chat.channel, username + " " + lang.commands.chatgpt["NO_MESSAGE"] )

    const prompt = chat.message.text
    const model = command.value.chatgpt?.model as unknown as string
    const temperature = command.value.chatgpt?.temperature as unknown as number
    const maxTokens = command.value.chatgpt?.maxTokens as unknown as number

    const response = await chatgpt.requestCompletion(prompt, model, temperature, maxTokens)

    if(platform === "twitch") return client.say(chat.channel, response as unknown as string)

}

export default chatGPTCommand
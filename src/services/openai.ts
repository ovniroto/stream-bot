import { ChatCompletion, ChatCompletionMessage, Completion, OpenAI } from "openai"
import * as langService from "@/services/language.ts"

const openai = new OpenAI(Deno.env.get("OPENAI_API_KEY")!)

const requestCompletion = async (prompt: string, model: string, temperature: number, maxTokens: number) => {

    const lang = await langService.get()

    const response: Completion = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: temperature,
        maxTokens: maxTokens,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0
    })

    if(response.choices.length == 0 || response.choices == undefined) {
        return lang.commands.chatgpt["SERVICE_DOWN"]
    }
    
    return response.choices[0].text

}

const requestChatCompletion = async (prompt: ChatCompletionMessage[], model: string, temperature: number, maxTokens: number) => {

    const response: ChatCompletion = await openai.createChatCompletion({
        model: model,
        messages: prompt,
        temperature: temperature,
        maxTokens: maxTokens,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0
    })

    // TODO: Need testing
    console.log(response)

}


export {
    requestCompletion,
    requestChatCompletion
}
// deno-lint-ignore-file

import { OpenAI } from "openai"
import * as bot from "./bot.ts"

const openai = new OpenAI(Deno.env.get("OPENAI_API_KEY")!)

const request = async (prompt: string, model: string, temperature: number, maxTokens: number) => {

    const lang = await bot.lang()

    const response: any = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: temperature,
        maxTokens: maxTokens,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0
    })

    if(response.choices.length == 0 || response.choices == undefined) {
        return lang.commands.chatgpt.down
    }
    
    return response.choices[0].text
}


export {
    request
}
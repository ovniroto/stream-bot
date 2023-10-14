import * as botModel from '@/models/bot.ts'
import { fileData } from "@/utils/file.ts"

const set = async (lang: string) => {
    const bot = await botModel.get()
    bot.value.language = lang
    await botModel.update(bot.value)
}

const get = async () => {
    const bot = await botModel.get()
    const language = bot.value?.language
    if(!language) return
    return await fileData(`static/languages/${language}.json`)
}

export {
    get,
    set
}
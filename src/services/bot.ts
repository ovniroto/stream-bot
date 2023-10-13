// deno-lint-ignore-file

import * as botModel from '../models/bot.ts'
import * as commands from './commands.ts'
import * as twitch from './twitch.ts'
import { fileData } from "../utils/file.ts"
import { ICommand } from "../interfaces/commands.ts"

const start = async () => {

    console.log("[StreamBot] Starting...")

    await loadVersion()
    await loadEnvParams()

    // Connect Twitch Client
    await twitch.connect()

}

const loadEnvParams = async () => {

    // Twitch env params
    if(Deno.env.get("TWITCH_USERNAME") === "username" || Deno.env.get("TWITCH_ACCESS_TOKEN") === "your-token-here" || Deno.env.get("TWITCH_CHANNEL") === "channel") {
        console.log("[StreamBot] Can't connect to Twitch. To use the bot on Twitch it is necessary to add authentication data.")
    }

    // OpenAI env params
    if(Deno.env.get("OPENAI_API_KEY") === "your-key-here") {
        await commands.disable("ai")
        console.log("[StreamBot] The !ai command has been disabled because you have not set the OpenAI API Key.")
    }

}

const loadVersion = async () => {

    const bot = await botModel.get()
    const dbVersion = bot.value?.version

    const decoder = new TextDecoder("utf-8")
    const fileDatas = await Deno.readFile("./version")
    const fileVersion = JSON.parse(decoder.decode(fileDatas)).version

    if(dbVersion === undefined) {

        console.log(`[StreamBot] Installing version ${fileVersion}...`)
        await update(fileVersion)

    } else if(dbVersion !== fileVersion) {

        console.log(`[StreamBot] New version ${fileVersion} detected. Updating...`)
        await update(fileVersion)

    } else {
        console.log(`[StreamBot] Version ${fileVersion} loaded!`)
    }

}

const update = async (fileVersion: string) => {

    const bot = await botModel.get()
    const dbVersion = bot.value?.version

    if(fileVersion >= '0.1.0') {
        
        const cmds = await fileData("static/commands/0.1.0.json")
        cmds.forEach(async (command: ICommand) => {
            await commands.create(command)
        })

    }

    if(dbVersion === undefined) {

        await botModel.create({
            installed: true,
            version: fileVersion,
            language: "english"
        })

        console.log(`[StreamBot] Version ${fileVersion} installed!`)

    } else {

        await botModel.update({
            version: fileVersion
        })

        console.log(`[StreamBot] Data updated to StreamBot v${fileVersion}!`)

    }

}

const lang = async () => {
    const bot = await botModel.get()
    const language = bot.value?.language
    if(!language) return
    return await fileData(`static/languages/${language}.json`)
}

start()

export {
    lang
}
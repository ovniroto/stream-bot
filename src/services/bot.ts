// deno-lint-ignore-file

import * as botModel from '../models/bot.ts'
import * as commands from './commands.ts'
import * as twitch from './twitch.ts'

const start = async () => {

    console.log("[StreamBot] Starting...")

    await checkVersion()

    // Connect Twitch Client
    await twitch.connect()

}

const checkVersion = async () => {

    const bot = await botModel.get()
    const dbVersion = bot.value.version

    const decoder = new TextDecoder("utf-8")
    const fileData = await Deno.readFile("./version")
    const fileVersion = JSON.parse(decoder.decode(fileData)).version

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
    const dbVersion = bot.value.version

    if(fileVersion >= '0.1.0') {

        await commands.create({
            name: '8ball',
            alias: [ 'magicball' ],
            description: 'A magical ball that will respond in an affirmative or negative way.',
            permissions: [],
            type: 'random-option',
            cooldown: {
                user: 0,
                global: 0
            },
            category: 'fun',
            default: true,
            disabled: false
        })

        await commands.create({
            name: 'fortune',
            alias: [ 'cookie' ],
            description: 'A fortune cookie with a phrase for you.',
            permissions: [],
            type: 'random-option',
            cooldown: {
                user: 86400,
                global: 0
            },
            category: 'fun',
            default: true,
            disabled: false
        })

        await commands.create({
            name: 'rtd',
            alias: [ 'rollthedice' ],
            description: 'It is simply a dice.',
            permissions: [],
            type: 'random-number',
            cooldown: {
                user: 0,
                global: 0
            },
            category: 'fun',
            default: true,
            disabled: false
        })

    }

    if(dbVersion === undefined) {

        await botModel.create({
            installed: true,
            version: fileVersion
        })

        console.log(`[StreamBot] Version ${fileVersion} installed!`)

    } else {

        await botModel.update({
            version: fileVersion
        })

        console.log(`[StreamBot] Data updated! (${dbVersion} -> ${fileVersion})`)

    }

}

start()
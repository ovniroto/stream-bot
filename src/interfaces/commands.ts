import { ITwitchChat, ITwitchClient } from '@/interfaces/twitch.ts'

export interface ICommand {
    name: string
    alias: string[]
    permissions: string[]
    description: string
    type: string
    icon?: string
    response?: string
    options?: string[]
    number?: {
        min: number
        max: number
    }
    chatgpt?: {
        model: string
        temperature: number
        maxTokens: number
    }
    cooldown: {
        user: number
        global: number
    }
    category: string
    default?: boolean
    disabled: boolean
}

export interface ICommandDatabase {
    key: [ string, string ]
    value: ICommand
    versionstamp?: string
}

export type ICommandChat = ITwitchChat
export type ICommandClient = ITwitchClient

export type ICommandPlatform = "twitch"
export interface ICommand {
    name: string
    alias: string[]
    permissions: string[]
    description: string
    type: string
    content?: string
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

export type ICommandPlatform = "twitch"
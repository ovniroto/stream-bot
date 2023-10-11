export interface ICommand {
    name: string
    alias: string[]
    permissions: string[]
    description: string
    type: string,
    cooldown: {
        user: number
        global: number
    }
    category: string
    default?: boolean
    disabled: boolean
}

export interface IDatabaseCommand {
    key: [ string, string ]
    value: ICommand,
    versionstamp?: string
}
export interface IDatabaseBot {
    key: [string, string]
    value: {
        installed: boolean
        version: string
    },
    versionstamp?: string
}
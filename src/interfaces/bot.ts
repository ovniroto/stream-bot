export interface IBotData {
    installed: boolean
    version: string
    language: string
}

export interface IBotDatabase {
    key: [string, string]
    value: IBotData,
    versionstamp?: string
}
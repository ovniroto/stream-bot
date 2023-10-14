export interface ISpotifyData {
    token: string
    refresh: string
}

export interface ISpotifyDatabase {
    key: [string, string]
    value: ISpotifyData,
    versionstamp?: string
}
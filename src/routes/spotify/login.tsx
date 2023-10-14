import * as spotifyService from "@/services/spotify.ts"

export const handler = async () => {
    return await spotifyService.login()
}
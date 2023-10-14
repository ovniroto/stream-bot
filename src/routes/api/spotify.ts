// deno-lint-ignore-file

import * as spotifyService from "@/services/spotify.ts"

export const handler = async (req: Request) => {
    const code = req.url.split("=")[1]
    return await spotifyService.createToken(code)
}
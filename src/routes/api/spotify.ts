// deno-lint-ignore-file

import { saveTokens } from "../../services/spotify.ts"
import { encodeFormData } from "../../utils/form.ts"

export const handler = async (req: Request) => {

    const code = req.url.split("=")[1]

    const body = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: "http://localhost:8000/api/spotify",
    }

    const auth = btoa(Deno.env.get("SPOTIFY_CLIENT_ID")! + ":" + Deno.env.get("SPOTIFY_CLIENT_SECRET")!)

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': 'Basic ' + auth
        },
        body: encodeFormData(body)
    })

    const tokens = await response.json()

    await saveTokens({
        token: tokens.access_token,
        refresh: tokens.refresh_token
    })

    return Response.redirect("http://localhost:8000/spotify/success")

}
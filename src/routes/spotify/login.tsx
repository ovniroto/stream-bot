import * as queryString from "querystring"

export function handler(): Response {

    const scopes = "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state"

    const spotifyUri = "https://accounts.spotify.com/authorize?" + queryString.stringify({
		response_type: 'code',
		client_id: Deno.env.get("SPOTIFY_CLIENT_ID")!,
		scope: scopes,
		redirect_uri: "http://localhost:8000/api/spotify"
    })

    return Response.redirect(spotifyUri)

}
// deno-lint-ignore-file

import * as spotifyModel from '@/models/spotify.ts'
import { encodeFormData } from "@/utils/form.ts"
import * as queryString from "querystring"

const spotifyApiUri = "https://api.spotify.com/v1"

const load = async () => {
    await getTokenStatus()
}

const login = async () => {

    const scopes = "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state"

    const spotifyUri = "https://accounts.spotify.com/authorize?" + queryString.stringify({
		response_type: 'code',
		client_id: Deno.env.get("SPOTIFY_CLIENT_ID")!,
		scope: scopes,
		redirect_uri: "http://localhost:8000/api/spotify"
    })

    return Response.redirect(spotifyUri)

}

const createToken = async (code: string) => {

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

const saveTokens = async (tokens: { token: string, refresh: string }) => {
    const spotifyData = await spotifyModel.get()
    if(!spotifyData.versionstamp) {
        await spotifyModel.create({
            token: tokens.token,
            refresh: tokens.refresh
        })
    } else {
        await spotifyModel.update({
            token: tokens.token,
            refresh: tokens.refresh
        })
    }
}

const refreshToken = async () => {

    const spotifyData = await spotifyModel.get()
    const refresh = spotifyData.value.refresh

    const auth = btoa(Deno.env.get("SPOTIFY_CLIENT_ID")! + ":" + Deno.env.get("SPOTIFY_CLIENT_SECRET")!)
    const body = {
        grant_type: 'refresh_token',
        refresh_token: refresh
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + auth
        },
        body: encodeFormData(body)
    })

    const tokens = await response.json()
    await spotifyModel.update({
        token: tokens.token,
        refresh: tokens.refresh
    })

    return tokens.token

}

const getTokenStatus = async () =>  {

    const spotifyData = await spotifyModel.get()
    const token = spotifyData.value.token
    
    const response = await fetch(spotifyApiUri + "/me", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    })

    const status = await response.json()
    if(status.error) return false

    return token

}

const getToken = async () => {
    const token = await getTokenStatus()
    if(!token) return await refreshToken()
    return token
}

const getDeviceId = async () => {

    const token = await getToken()
    const response = await fetch(spotifyApiUri + "/me/player", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    })

    const player = await response.json()
    return player.device.id

}

const nextTrack = async () => {

    const token = await getToken()
    const device = await getDeviceId()

    const body = {
        device_id: device
    }

    const response = await fetch(spotifyApiUri + "/me/player/next", {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: encodeFormData(body)
    })

    const status = await response.json()
    if(status.error?.reason === "PREMIUM_REQUIRED") return false

    return true

}

const previousTrack = async () => {

    const token = await getToken()
    const device = await getDeviceId()

    const body = {
        device_id: device
    }

    const response = await fetch(spotifyApiUri + "/me/player/previous", {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: encodeFormData(body)
    })

    const status = await response.json()
    if(status.error?.reason === "PREMIUM_REQUIRED") return false

    return true

}

const addTrackToPlaylist = async (playlist: string, song: string) => {

    const token = await getToken()

    const body = {
        uris: [
            "spotify:track:" + song
        ],
        position: 0
    }

    const response = await fetch(spotifyApiUri + `/playlists/${playlist}/tracks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })

    const status = await response.json()

    if(status.error) return false

    return true

}

const getTrackData = async () => {

    const token = await getToken()

    const response = await fetch(spotifyApiUri + "/me/player/currently-playing", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const status = await response.json()
    if(status.error) return false

    let artists: string[] = []

    for (let index = 0; index < status.item.artists.length; index++) {
        artists.push(status.item.artists[index].name)
    }

    return {
        id: status.item.id,
        name: status.item.name,
        album: status.item.album.name,
        artists: artists,
        url: "https://open.spotify.com/track/" + status.item.id
    }

}

export {
    load,
    login,
    createToken,
    saveTokens,
    nextTrack,
    previousTrack,
    addTrackToPlaylist,
    getTrackData
}
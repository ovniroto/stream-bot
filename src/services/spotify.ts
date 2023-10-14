// deno-lint-ignore-file

import * as spotifyModel from '../models/spotify.ts'
import { encodeFormData } from "../utils/form.ts"

const spotifyApiUri = "https://api.spotify.com/v1"

const load = async () => {
    await getTokenStatus()
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

const addTraclToPlaylist = async (playlist: string, song: string) => {

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

    const trackData = {
        id: status.item.id,
        name: status.item.name,
        album: status.item.album.name,
        artists: artists,
        url: "https://open.spotify.com/track/" + status.item.id
    }

    return trackData

}

export {

    load,
    saveTokens,

    nextTrack,
    previousTrack,

    addTraclToPlaylist,
    getTrackData

}
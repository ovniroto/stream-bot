// deno-lint-ignore-file

import * as db from '@/models/database.ts'
import { ISpotifyDatabase }  from "@/interfaces/spotify.ts"

const get = async (): Promise<ISpotifyDatabase> => {
	return await db.get("system", "spotify") as unknown as ISpotifyDatabase
}

const create = async (data: any): Promise<Deno.KvCommitResult> => {
    return await db.set("system", "spotify", data)
}

const update = async (data: any): Promise<Deno.KvCommitResult> => {
	return await db.set("system", "spotify", data)
}

export {
    get,
    update,
    create
}
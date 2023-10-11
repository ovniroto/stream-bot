// deno-lint-ignore-file

import * as db from '../models/database.ts'
import { IDatabaseBot }  from "../interfaces/bot.ts"

const get = async (): Promise<IDatabaseBot> => {
	return await db.get("system", "bot") as unknown as IDatabaseBot
}

const create = async (data: any): Promise<Deno.KvCommitResult> => {
    return await db.set("system", "bot", data)
}

const update = async (data: any): Promise<Deno.KvCommitResult> => {
	return await db.set("system", "bot", data)
}

export {
    get,
    update,
    create
}
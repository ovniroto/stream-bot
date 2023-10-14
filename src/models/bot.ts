// deno-lint-ignore-file

import * as db from '@/models/database.ts'
import { IBotDatabase }  from "@/interfaces/bot.ts"

const get = async (): Promise<IBotDatabase> => {
	return await db.get("system", "bot") as unknown as IBotDatabase
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
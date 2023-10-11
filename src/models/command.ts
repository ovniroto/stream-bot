// deno-lint-ignore-file

import * as db from '../models/database.ts'
import { IDatabaseCommand }  from "../interfaces/commands.ts"

const get = async (name: string): Promise<IDatabaseCommand> => {
	return await db.get("commands", name) as unknown as IDatabaseCommand
}

const getAll = async (): Promise<IDatabaseCommand[]> => {
    return await db.getAll("commands")
}

const create = async (name: string, data: any): Promise<Deno.KvCommitResult> => {
    return await db.set("commands", name, data)
}

const update = async (name: string, data: any): Promise<Deno.KvCommitResult> => {
	return await db.set("commands", name, data)
}

const remove = async (name: string): Promise<void> => {
	return await db.remove("commands", name)
}

export {

    get,
    getAll,

    create,
    update,
    remove
    
}
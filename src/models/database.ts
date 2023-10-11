// deno-lint-ignore-file

const env = Deno.env.get("ENVIRONMENT")!
const db = env == "development" || "local-production" ? await Deno.openKv('./database/data.db') : await Deno.openKv()

const get = async (database: string, id: string): Promise<Deno.KvEntryMaybe<unknown>> => {
    return await db.get([database, id])
}

const getAll = async (database: string): Promise<any> => {
    const iter = db.list<string>({ prefix: [ database ] })
    const data: any = []
    for await (const res of iter) data.push(res)
    return data
}

const set = async (database: string, id: string, data: any): Promise<Deno.KvCommitResult> => {
	return await db.set([database, id], data)
}

const update = async (database: string, id: string, data: any): Promise<Deno.KvCommitResult> => {
    return await db.set([database, id], data)
}

const remove = async (database: string, id: string): Promise<void> => {
    return await db.delete([database, id])
}

export {
    get,
    getAll,
    set,
    update,
    remove
}
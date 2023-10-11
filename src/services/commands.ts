// deno-lint-ignore-file

import * as commandModel from '../models/command.ts'
import { ICommand } from '../interfaces/commands.ts'

const get = async (name: string) => {

}

const load = async () => {

}

const create = async (data: ICommand) => {
    commandModel.create(data.name, data)
}


export {
    load,
    get,
    create
}
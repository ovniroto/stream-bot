import { writeAll } from "$std/streams/write_all.ts"
import { exists } from "$std/fs/mod.ts"
import { decompress } from "zip"

const updateDirectory = './update/'
const backupDirectory = './backup/'

const checkRemoteVersion = async () => {
    const repoUrl = await fetch("https://raw.githubusercontent.com/ovniroto/stream-bot/main/version")
    const remoteVersion = await repoUrl.json()
    return remoteVersion.version
}

const checkAppVersion = async () => {
    const decoder = new TextDecoder("utf-8")
    const fileData = await Deno.readFile("./version")
    const appVersion = JSON.parse(decoder.decode(fileData))
    return appVersion.version
}

const downloadVersion = async (version: string) => {

    const response = await fetch(`https://github.com/ovniroto/stream-bot/archive/refs/tags/v${version}.zip`)

    const blob = await response.blob()
    const buf = await blob.arrayBuffer()
    const data = new Uint8Array(buf)
  
    const updateDirectoryExists = await exists(updateDirectory)
    if(!updateDirectoryExists) await Deno.mkdir(updateDirectory)

    const file = await Deno.create(updateDirectory + `StreamBot_v${version}.zip`)
    await writeAll(file, data)
    Deno.close(file.rid)

    console.log(`[StreamBot] Download completed!`)

}

const unzipVersion = async (version: string) => {
    const file = updateDirectory + "StreamBot_v" + version + ".zip"
    return await decompress(file, updateDirectory)
}

const moveVersion = async (version: string) => {

    const newVersionDirectory = updateDirectory + "stream-bot-" + version + "/"

    await Deno.rename(newVersionDirectory + "src", "./src")
    await Deno.rename(newVersionDirectory + ".gitignore", "./.gitignore")
    await Deno.rename(newVersionDirectory + ".env.example", "./.env.example")
    await Deno.rename(newVersionDirectory + "deno.json", "./deno.json")
    await Deno.rename(newVersionDirectory + "version", "./version")
    await Deno.rename(newVersionDirectory + "update.ts", "./update.ts")
    await Deno.rename(newVersionDirectory + "twind.config.ts", "./twind.config.ts")
    await Deno.rename(newVersionDirectory + "StreamBot_Start.bat", "./StreamBot_Start.bat")
    await Deno.rename(newVersionDirectory + "StreamBot_Update.bat", "./StreamBot_Update.bat")
    await Deno.rename(newVersionDirectory + "LICENSE", "./LICENSE")
    await Deno.rename(newVersionDirectory + "README.md", "./README.md")
    await Deno.rename(newVersionDirectory + "CHANGELOG.md", "./CHANGELOG.md")

}

const backupFiles = async () => {

    const backupDirectoryExists = await exists(backupDirectory)
    if(!backupDirectoryExists) await Deno.mkdir(backupDirectory)

    await Deno.rename("./src", backupDirectory + "src")
    await Deno.rename("./.gitignore", backupDirectory + ".gitignore")
    await Deno.rename("./.env.example", backupDirectory + ".env.example")
    await Deno.rename("./deno.json", backupDirectory + "deno.json")
    await Deno.rename("./version", backupDirectory + "version")
    await Deno.rename("./update.ts", backupDirectory + "update.ts")
    await Deno.rename("./twind.config.ts", backupDirectory + "twind.config.ts")
    await Deno.rename("./StreamBot_Start.bat", backupDirectory + "StreamBot_Start.bat")
    await Deno.rename("./StreamBot_Update.bat", backupDirectory + "StreamBot_Update.bat")
    await Deno.rename("./README.md", backupDirectory + "README.md")
    await Deno.rename("./CHANGELOG.md", backupDirectory + "CHANGELOG.md")
    await Deno.rename("./LICENSE", backupDirectory + "LICENSE")

    console.log(`[StreamBot] Backup completed!`)

}

const appUpdate = async () => {

    console.log(`[StreamBot] Checking new version...`)

    const remoteVersion = await checkRemoteVersion()
    const appVersion = await checkAppVersion()

    if(remoteVersion !== appVersion) {

        console.log(`[StreamBot] New version ${remoteVersion} found! Downloading...`)
        await downloadVersion(remoteVersion)

        console.log(`[StreamBot] Backup files...`)
        await backupFiles()

        console.log(`[StreamBot] Installing new version...`)
        const unzip = await unzipVersion(remoteVersion)
        if(!unzip) return console.log(`[StreamBot] [ERROR:UNZIP] An error has occurred when decompressing files`)
        await moveVersion(remoteVersion)

        console.log(`[StreamBot] New version ${remoteVersion} installed!`)

        return

    }

    console.log(`[StreamBot] No new version detected.`)

}

appUpdate()
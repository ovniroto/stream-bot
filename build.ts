const version = await Deno.readTextFile("./version")

let readme = await Deno.readTextFile("./README.md")
let bat = await Deno.readTextFile("./StreamBot_Start.bat")

readme = readme.replace(/(\d+(\.\d+)+)/g, JSON.parse(version).version)
bat = bat.replace(/(\d+(\.\d+)+)/g, JSON.parse(version).version)

await Deno.writeTextFile("./README.md", readme)
await Deno.writeTextFile("./StreamBot_Start.bat", bat)
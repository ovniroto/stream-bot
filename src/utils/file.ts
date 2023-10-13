export const fileData = async (file: string) => {
    const decoder = new TextDecoder("utf-8")
    const fileData = await Deno.readFile("./src/" + file)
    return JSON.parse(decoder.decode(fileData))
}
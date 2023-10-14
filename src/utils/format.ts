type Data = { username: string, number: string }

export const formatResponse = (string: string, data: Data) => {

    return string
        .replaceAll("{user}", data.username)
        .replaceAll("{number}", data.number)

}
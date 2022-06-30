export const encodeBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
}

export const decodeBase64 = (str: string) => {
    return Buffer.from(str, "base64").toString("ascii");
}
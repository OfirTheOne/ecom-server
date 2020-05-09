export function insertAt(origin: string, text: string, index: number) {
    origin.replace(new RegExp(`^(.{${index}})(.)`), `$1${text}$2`);
}
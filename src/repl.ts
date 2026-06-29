export function cleanInput(input: string): string[] {
    

    const words = input.trim().toLowerCase().split(" ")
    return words;
}

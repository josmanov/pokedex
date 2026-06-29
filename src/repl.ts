export function cleanInput(input: string): string[] {
    

    const words = input.toLowerCase().split(" ")
    return words;
}

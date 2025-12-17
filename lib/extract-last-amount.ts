export function extractLastAmount(input: string){
    const regex = /\b(x\d+|\d+x)\b/gi;
    const matches = Array.from(input.matchAll(regex));

    if (matches.length === 0) {
        return { name: input, amount: 1};
    }

    const lastMatch = matches[matches.length - 1];
    const fullMatch = lastMatch[0];
    const index = lastMatch.index!;

    const numberPart = fullMatch.replace(/x/gi, "");
    const amount = parseInt(numberPart, 10) || 1;

    const textBefore = input.substring(0, index).trim();
    const textAfter = input.substring(index + fullMatch.length).trim();

    const name = `${textBefore} ${textAfter}`.trim();

    return { name, amount }
}
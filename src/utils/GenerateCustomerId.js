export function generateCustomID() {
    const prefix = "MI";
    const mid = "MID";
    
    // Generate random two-digit number (from 00 to 99)
    const randomTwoDigitNumber = () => String(Math.floor(Math.random() * 100)).padStart(2, '0');
    
    // Generate two random uppercase letters
    const randomUppercaseLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const randomTwoUppercaseLetters = () => randomUppercaseLetter() + randomUppercaseLetter();
    
    // Generate a ten-digit number
    const randomTenDigitNumber = () => String(Math.floor(Math.random() * 10000000000)).padStart(10, '0');
    
    const part1 = randomTwoDigitNumber();
    const part2 = randomTwoDigitNumber();
    const part3 = randomTwoUppercaseLetters();
    const part4 = randomTwoDigitNumber();
    const part5 = randomTenDigitNumber();
    
    const customID = `${prefix}${part1}${mid}${part2}${part3}${part4}${part5}`;
    return customID;
}
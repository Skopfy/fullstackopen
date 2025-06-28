function calculateBmi(height: number, weight: number): string {
    let message = "";
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
        message = "Underweight range";
    } else if (bmi > 25) {
        message = "Overweight range";
    } else {
        message = "Normal range";
    }
    return message;
}

console.log(calculateBmi(180, 74));
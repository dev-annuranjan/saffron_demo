export function generateRandomList(n: number) {
    const randomArray = [];
    for (let i = 0; i < n; i++) randomArray.push(i);
    randomArray.sort(() => Math.random() - 0.5)
    return randomArray;
}

export function generateRandomOptionOrder(questions: any) {
    const optionOrders = [];
    for (let i = 0; i < questions.length; i++) {
        const options = questions[i].options;
        const optionsOrder = generateRandomList(options.length);
        optionOrders.push(optionsOrder);
    }
    return optionOrders;
}

export function formatNumber (num: number){
    let numString = num.toString();
    let digitCount = 0;
    while (num > 0) {
        digitCount++;
        num = Math.floor(num / 10);
    }
    digitCount = Math.max(2, digitCount);
   
    if (numString.length < digitCount) {
        numString = "0".repeat(digitCount - numString.length) + numString;
    }

    return numString;
}
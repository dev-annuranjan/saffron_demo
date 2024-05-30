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
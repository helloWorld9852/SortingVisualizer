export function bubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    
    const auxiliaryArray = array.slice();
    bubbleSortHelper(auxiliaryArray, animations);
    
    return animations;
}

function bubbleSortHelper(auxiliaryArray, animations) {
    let len = auxiliaryArray.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                animations.push([j, j + 1]);

                animations.push(j, j + 1, auxiliaryArray[j], auxiliaryArray[j + 1]);

                let temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j + 1];
                auxiliaryArray[j + 1] = temp;
            }
        }
    }
}

export function quickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, auxArray, animations) {
    if (startIdx < endIdx) {
        const pivotIdx = partition(mainArray, startIdx, endIdx, auxArray, animations);
        quickSortHelper(mainArray, startIdx, pivotIdx - 1, auxArray, animations);
        quickSortHelper(mainArray, pivotIdx + 1, endIdx, auxArray, animations);
    }
}

function partition(mainArray, startIdx, endIdx, auxArray, animations) {
    const pivot = mainArray[endIdx];
    let i = startIdx - 1;

    for (let j = startIdx; j < endIdx; j++) {
        animations.push([j, endIdx]); // Highlight bars for comparison
        if (auxArray[j] < pivot) {
            i++;
            animations.push([i, auxArray[j]]);
            animations.push([j, auxArray[i]]);
            swap(auxArray, i, j);
        } else {
            animations.push([j, auxArray[j]]);
            animations.push([j, auxArray[j]]);
        }
    }
    animations.push([i + 1, auxArray[endIdx]]);
    animations.push([endIdx, auxArray[i + 1]]);
    swap(auxArray, i + 1, endIdx);
    return i + 1;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

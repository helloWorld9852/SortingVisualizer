export function mergeSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxarray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxarray, animations);
    return animations;
}

function mergeSortHelper (
    mainArray,
    startIdx,
    endIdx,
    auxarray,
    animations
) {
    if(startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxarray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxarray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxarray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxarray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while ( i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if(auxarray[i] <= auxarray[j]) {
            animations.push([k, auxarray[i]]);
            mainArray[k++] = auxarray[i++];
        } else {
            animations.push([k, auxarray[j]]);
            mainArray[k++] = auxarray[j++];
        }
    }
    while ( i <= middleIdx)
    {
        animations.push([i, i]);
        animations.push([i, i]);

        animations.push([k, auxarray[i]]);
        mainArray[k++] = auxarray[i++];
    }
    while ( j <= endIdx)
    {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxarray[j]]);
        mainArray[k++] = auxarray[j++];
    }
}


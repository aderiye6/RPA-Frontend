function flipReverseCk (stringArray, subs,index,ans){
   
    var shuffledStringArray
    var j, x, i;
    if (stringArray.join('')  === stringArray.reverse().join()) {
        // return 1
        console.log('yeah')
        ans[index] = 1;
        return ans
    }

    // for(let i = 0 ; i < stringArray.length; i ++ ){
    //     shuffledStringArray = stringArray.sort(() => Math.random() - 0.5);
    // }
    for (i = stringArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = stringArray[i];
        stringArray[i] = stringArray[j];
        stringArray[j] = x;
    }
    console.log(stringArray, 'jsjsjjs')
    for (i = 0; i < subs; i++){
        flipReverseCk(stringArray, subs,index,ans)

    }
}

function palindrome(s, startIndex, endIndex, subs) {
    console.log(s, 'sdsjs')
    
    const stringArry = s.split('')
    console.log(stringArry, 'jdsjsss')
    const check = []
    var ans = []
    ans.fill(0, 0, startIndex.length)
    for (let i = 0; i < startIndex.length; i++) {
        const start = stringArry[i]
        const end = stringArry[endIndex]
        const range = stringArry.slice(startIndex, endIndex)
        const rangeString = range.join('')
        const reverseString = range.reverse().join('')
        console.log( rangeString, 'sdklss')

     const joe =   flipReverseCk(range, subs,i,startIndex.length)
     console.log(joe, 'jjjj')
        // if (rangeString === reverseString) {
        //     check.push(1)
        // }

        // var shuffledWord 
        // for(let i = 0 ; i < range.length; i ++ ){
        //     shuffledWord = range.sort(() => Math.random() - 0.5);
        // }

        // if (shuffledWord.join('')  === shuffledWord.join('')) {
        //     check.push(1)
        // }

        // console.log(shuffledWord, 'dsmsksjs')
    }
}

console.log(palindrome('teriiwemasklartu', 0, 5, 2))

// function flipReverseCk (stringArray, subs,index,ans){

//     var shuffledStringArray
//     var j, x, i;
//     if (stringArray.join('')  === stringArray.reverse().join()) {
//         // return 1
//         console.log('yeah')
//         ans[index] = 1;
//         return ans
//     }

//     // for(let i = 0 ; i < stringArray.length; i ++ ){
//     //     shuffledStringArray = stringArray.sort(() => Math.random() - 0.5);
//     // }
//     for (i = stringArray.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = stringArray[i];
//         stringArray[i] = stringArray[j];
//         stringArray[j] = x;
//     }
//     console.log(stringArray, 'jsjsjjs')
//     for (i = 0; i < subs; i++){
//         flipReverseCk(stringArray, subs,index,ans)

//     }
// }

// function palindrome(s, startIndex, endIndex, subs) {
//     console.log(s, 'sdsjs')

//     const stringArry = s.split('')
//     console.log(stringArry, 'jdsjsss')
//     const check = []
//     var ans = []
//     ans.fill(0, 0, startIndex.length)
//     for (let i = 0; i < startIndex.length; i++) {
//         const start = stringArry[i]
//         const end = stringArry[endIndex]
//         const range = stringArry.slice(startIndex, endIndex)
//         const rangeString = range.join('')
//         const reverseString = range.reverse().join('')
//         console.log( rangeString, 'sdklss')

//      const joe =   flipReverseCk(range, subs,i,startIndex.length)
//      console.log(joe, 'jjjj')

//     }
// }

// console.log(palindrome('teriiwemasklartu', 0, 5, 2))

// a= 3digit integer
// b= incrementLimit

// function increment(a, b) {
//     var count = 0
//     var array = String(a)
//         .split('')
//         .map((num) => {
//             return Number(num)
//         })

//     for (let i = 0; i < array.length; i++) {
//         for (let j = array[i] + 1; j < 10; j++) {
//             if (count >= b) {
//                 continue
//             }
//             array[i] += 1
//             count += 1
//         }
//         continue
//     }

//     console.log(array)
// }

// increment(767, 4)

function change(str, sub) {
    console.log(str, 'a')

    // var n = s.length
    // var cc = 0

    // for (var i = 0; i < n / 2; i++) {
    //     if (s[i] == s[n - i - 1]) {
    //         continue
    //     }
    //     cc += 1
    // }
    // return cc <= b

    let list = []

    // For each character in input strings,
    // remove character if list contains
    // else add character to list
    console.log(str, 'inputtttttt')
    for (let i = 0; i < str.length; i++) {
        console.log(str[i], 'strii')
        if (list.includes(str[i])) list.splice(list.indexOf(str[i]), 1)
        else list.push(str[i])
    }

    if (
        (str.length % 2 == 0 && list.length == 0) ||
        (str.length % 2 == 1 && list.length == 1)
    ) {
        console.log(list, 'jjjsjsjsjsjs')
        return 1
    }

    // If string length is odd
    else {
      
        if (list.length / 2 == 0) {
            if (Math.floor(list.length)/2 <= sub) {
                return 1
            } else {
                return 0
            }
        } else {
            console.log(list, 'odddddddd')
            console.log(list.length, 'lengthlengthlength')
            if ((Math.floor(list.length - 1)/2 )<= sub) {
                return 1
            } else {
                return 0
            }
        }

        // if ((list.length) / 2 == 1) {
        //     if ((list.length-1) / 2 <= sub){
        //         return 1
        //     }else{
        //         return false
        //     }

        // }
    }
}

function palindrome(s, startIndex, endIndex, subs) {
    const stringArry = s.split('')

    var ans = new Array(startIndex.length).fill(0, 0, startIndex.length+1)

    for (let i = 0; i < startIndex.length; i++) {
        // var substringArray = stringArry.slice(startIndex[i], endIndex[i])
        // flipReverseCk(substringArray, subs[i],i,ans)

        var checks = change(
            stringArry.slice(startIndex[i], endIndex[i] + 1),
            subs[i]
        )

        if (checks) {
            ans[i] = 1
        }
    }

    return ans.join('')
}

// console.log(palindrome('cdecd', [0, 0, 0, 0], [0, 1, 2, 3], [0, 1, 1, 0]))
// console.log(palindrome('xxdnssuqevu', [0], [10],[3]))
// console.log(palindrome('aaxxxcccbb', [0], [9],[1]))
console.log(
    palindrome(
        'yczuykvelbobvfnjtfuqxxdnssuqevucxvwxgtetuuurzjaspvkounbpgyfmtboswmrcfvvzprqqbsksnvgkikzqigcdhqvdeoijkdkbxasyveskzyuiitaszdvgvsmchulrzwuwym',
        [
            2,  64,  7,  33, 20,  3, 32,  4,  15,   6, 69,  5,
            39,  16,  6,  54, 45, 30,  1, 39, 124,  29, 20, 45,
             1,  25, 26, 110, 89, 75, 53, 21,  22,  18, 44, 39,
            47,   2, 46,   4,  7, 22, 37, 83,  94,  87, 34, 79,
            76,   3, 60,  82, 47,  5, 40, 40,  21, 112, 42, 32,
             2, 131, 46,  67, 54, 48, 42, 74,  21,  54, 21, 32,
           118,  16, 76,  75, 95, 71, 20, 51,  54,  88, 79, 72,
            51,  53, 69,  22, 16, 29, 55, 11,   1,  68, 61, 23,
            49, 119, 76, 111
        ],
        [
            93, 106,  62,  64, 111, 115,  61,  19,  80,  66,  73,  30,
            43,  43, 133, 103,  56, 122, 107,  90, 129, 123,  55,  61,
           101,  31,  34, 116,  97, 111,  68,  98, 100,  28,  66,  96,
           127, 131, 134,  17,  42, 100,  88, 133, 112,  89, 126, 132,
            79, 120,  97,  91, 108,  99,  54,  88, 130, 132, 131,  35,
            89, 135,  88, 126,  59, 134,  78, 133, 125, 114,  23,  88,
           126,  34,  80, 111, 132, 107,  30,  52,  72, 137,  98,  94,
           108, 117,  73, 100, 127,  32, 131, 129, 131,  86, 137,  60,
           103, 135,  98, 129
        ],
        [
            7, 25,  20, 32, 67, 113,   0, 7,  1,  1, 3,  1,
            0, 28, 118,  6,  5,   6, 107, 1,  1,  6, 8, 17,
            5,  4,   9,  7,  9,   8,  16, 9,  9,  0, 6,  7,
            4,  3,   6,  4, 15,   8,   5, 6,  3,  3, 4,  7,
            4,  5,   7,  1,  9,   6,   5, 0,  5,  4, 5,  2,
            5,  3,  14,  5,  5,   7,  37, 6,  1, 61, 3, 56,
            9,  5,   1, 37, 10,   6,   3, 2,  4,  7, 4,  3,
            8,  7,   2, 15, 10,   0,  77, 0, 30,  4, 8, 10,
            4,  3,   2, 19
        
        ]
    )
)

// d
// n
// q
// e
// z

// <?php

// /*
//  * Complete the 'findMedian' function below.
//  *
//  * The function is expected to return an INTEGER.
//  * The function accepts INTEGER_ARRAY arr as parameter.
//  */

// function findMedian($arr) {
//     sort($arr);
//     // Write your code here
//     $ans = floor(count($arr)/2);
//     return $arr[$ans];

// }
// $fptr = fopen(getenv("OUTPUT_PATH"), "w");

// $n = intval(trim(fgets(STDIN)));

// $arr_temp = rtrim(fgets(STDIN));

// $arr = array_map('intval', preg_split('/ /', $arr_temp, -1, PREG_SPLIT_NO_EMPTY));

// $result = findMedian($arr);

// fwrite($fptr, $result . "\n");

// fclose($fptr);

import React from 'react';

function Reverse() {
    const word = "apple"
    const reverseWord = word.split('').reverse();
    const reverseWordWithJoin = word.split('').reverse().join('');
    // reserWord is a
    console.log(reverseWord.length)
    console.log(reverseWordWithJoin.length)

    console.log(reverseWord.size)
    console.log(reverseWordWithJoin.size)


    return (
        <div>
            {word}
            {reverseWord}
            
        </div>
    );
}

export default Reverse;

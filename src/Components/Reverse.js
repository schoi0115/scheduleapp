import React, { useState } from 'react';

function Reverse() {
    const word = "apple"
    const reverseWord = word.split('').reverse();
    const reverseWordWithJoin = word.split('').reverse().join('');
    // reserWord is a
    // console.log(reverseWord.length)
    // console.log(reverseWordWithJoin.length)

    // console.log(reverseWord.size)
    // console.log(reverseWordWithJoin.size)
    const [fruits, setFruits] = useState(["apple", "orange", "mango"]);
    const reverseWords = () => {
        const reversedFruits = fruits.map(word => word.split('').reverse().join(''));
        setFruits(reversedFruits);
    }
    const reversedFruits = fruits.map(word => word.split('').reverse().join(''));
    const reverseAndJoin = () => {
        const reversedFruits = fruits.map(word => word.split('').reverse().join(''));
        const reversedString = reversedFruits.join(', ');
        setFruits([reversedString]);
    }

    const fruitArray = ['apple', 'mango', 'banana'];
    const reversedFruitArray = fruitArray.map(word => word.split('').reverse().join(''));
    console.log(reversedFruitArray.length)
    const reversedFruitArrayAddingComma = reversedFruits.join(', ');

    return (
        <div>
            {word}
            <br />
            {reverseWord}
            <br />
            {reversedFruits[0]}
            <br />
            {reversedFruits[1]}
            <br />
            {reversedFruits[2]}


            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            <button onClick={reverseWords}>Reverse Words</button>
            <ul>
                {fruits[0].split(', ').map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            <button onClick={reverseAndJoin}>Reverse Words and Add Commas</button>

            <br />
            {reversedFruitArray}
            <br />
            {reversedFruitArrayAddingComma}

        </div>
    );
}

export default Reverse;

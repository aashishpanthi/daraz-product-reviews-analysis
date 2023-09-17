import React from "react";

function WordCloud({ reviews }) {
  // get all the words from the reviews
  const words = reviews
    .map(({ positiveWords, negativeWords }) => {
      return [...positiveWords, ...negativeWords];
    })
    .flat();

  // count the number of times each word appears
  const wordCounts = words.reduce((acc, word) => {
    if (acc[word]) {
      acc[word] += 1;
    } else {
      acc[word] = 1;
    }
    return acc;
  }, {});

  // sort the words by count with the most frequent words first and include word count
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({ word, count }));

  console.log(sortedWords);

  return <div>WordCloud</div>;
}

export default WordCloud;

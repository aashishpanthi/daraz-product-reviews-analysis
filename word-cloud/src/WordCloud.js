import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

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
    .map(([word, count]) => ({ text: word, value: count }));

  console.log(sortedWords);

  return (
    <div
      style={{
        height: 600,
        width: 800,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid #ccc",
      }}
    >
      <ReactWordcloud size={[800, 600]} words={sortedWords} />
    </div>
  );
}

export default WordCloud;

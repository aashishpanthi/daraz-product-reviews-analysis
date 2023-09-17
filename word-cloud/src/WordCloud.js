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

  console.log(words);

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
    .map(([word, count]) => ({ text: word, value: count }))
    .slice(0, 150);

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
      <ReactWordcloud
        size={[800, 600]}
        words={sortedWords}
        options={{
          rotations: 5,
          rotationAngles: [-75, 75],
          fontSizes: [12, 80],
          padding: 1,
          spiral: "rectangular",
          enableTooltip: true,
          deterministic: true,

          colors: [
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
          ],

          transitionDuration: 1000,
          enableOptimizations: true,
        }}
      />
    </div>
  );
}

export default WordCloud;

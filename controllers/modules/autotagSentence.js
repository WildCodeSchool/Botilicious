function autotagSentence(originalSentence, keywords, separators) {
  const splitSentence = originalSentence.split(separators[0]);
  const foundKeywords = [];
  let pattern = originalSentence;
  let wordsToCheck;
  let nbOfKeywords;
  let counter;
  let increment;

  keywords.map((keyword) => {
    counter = 0;
    while (counter < splitSentence.length) {
      // console.log('counter: ', counter);
      // console.log('splitSentence_whileStart: ', splitSentence);
      nbOfKeywords = keyword.text.split(' ').length;
      wordsToCheck = splitSentence.slice(counter, counter + nbOfKeywords);
      if (wordsToCheck.join(' ') === keyword.text) {
        foundKeywords.push({
          text: wordsToCheck.join(' '),
          TagId: keyword.TagId,
          tag: keyword.tag,
        });
        pattern = pattern.replace(keyword.text, `<${keyword.tag}>`);
        splitSentence[counter] = splitSentence.splice(counter, nbOfKeywords, keyword.text).join(separators[0]);
      }
      // console.log('splitSentence_whileEnd: ', splitSentence);
      // console.log('foundKeywords: ', foundKeywords);
      increment = 1;
      counter += increment;
    }
    return foundKeywords;
  });

  const myobject = {
    foundKeywords, pattern: pattern.split(' '), array: splitSentence, originalSentence,
  };
  console.log('myobject: ', myobject);
  return myobject;
}
module.exports = autotagSentence;

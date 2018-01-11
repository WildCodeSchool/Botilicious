function autotagSentence(originalSentence, keywords, separators) {
  let splitSentence;
  const foundKeywords = [];
  const pattern = [];
  const asAnArray = [];
  let wordsToCheck;
  let nbOfKeywords;
  // let foundIndex;

  keywords.map((keyword) => {
    /**
     * 1) trouver le nombre de mots dans keyword en réalisant un split qui transforme la chaine de caractère
     * en tableau . On regarde la longueur de ce tableau.
     */
    nbOfKeywords = keyword.text.split(' ').length;
    /**
     * On split la phrase d'origine pour obtenir un tableau
     */
    splitSentence = originalSentence.split(separators[0]);
    /**
     * On fait une boucle sur ce tableau avec le .map
     */
    splitSentence.map((word, i, words) => {
      /**
       * En fonction du ou des keyword (ex : 'bonjour' ou 'San Francisco'), la boucle lit le bon nombre de mots dans splitsentence
       */
      wordsToCheck = words.slice(i, i + nbOfKeywords);
      // console.log('wordsToCheck: ', wordsToCheck);
      /**
       * On compare le paquet de mot écrits dans la phrase de l'utilisateur avec le keyword en cours
       */
      if (wordsToCheck.join(separators[0]) === keyword.text) {
        /**
         * Si ils sont identiques, on indique cette nouvelle association (ex: demain = time) dans la variable foundKeywords
         */
        foundKeywords.push({
          text: wordsToCheck.join(' '),
          TagId: keyword.TagId,
          tag: keyword.tag,
        });
        // asAnArray.push(wordsToCheck.join(separators[0]));
        /**
         * Remplacer le keyword par son nouveau tag
         */
        pattern.push(originalSentence.replace(keyword.text, `<${keyword.tag}>`));
        /**
         * En fonction de la position de i, on prend le ou les mots de la phrase qui correspondent au keyword, et si nécessaire
         * on les fusionne
         */
        splitSentence[i] = splitSentence.splice(i, nbOfKeywords, keyword.text).join(separators[0]);
        asAnArray.push(splitSentence);
      }
      return null;
    });
    return foundKeywords;
  });

  /**
   * si aucun keyword trouvé
   */
  if (asAnArray.length === 0) {
    asAnArray[0] = splitSentence;
  }

  // foundKeywords est la donnée principale.
  // pattern et asAnArray sont seulement dérivées des deux autres.
  const myobject = {
    foundKeywords, pattern, asAnArray, originalSentence,
  };
  console.log('myobject: ', myobject);
  return myobject;
}

module.exports = autotagSentence;

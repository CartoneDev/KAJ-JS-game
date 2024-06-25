var rush = rush || {};

function saveScore(score) {
  // add to scores array
  this.data.scores.push(score);

  // sort the scores in descending order
  this.data.scores.sort(function(a, b){
    return b-a; // descending numberic sort
  });

  // slice the array to maximum 8 elements
  this.data.scores = this.data.scores.slice(0, 8);

  // save to local storage
  localStorage['scores'] = JSON.stringify(this.data);
}

function toHtml() {
  var html = "<ul>";

  for (var i=0, len=this.data.scores.length; i<len; i++) {
    html += "<li>Rank " + (i+1) + " – " + this.data.scores[i] + "</li>";
  }

  html += "</ul>";
  return html;
}

function showTopScores() {
  function TopScores() {
    if (localStorage['scores'] !== undefined) {
      this.data = JSON.parse(localStorage['scores']);
    } else {
      this.data = {
        scores: []
      }
    }
  }

  var p = TopScores.prototype;

  p.saveScore = saveScore;
  p.toHTML = toHtml;

  return TopScores;
}

rush.TopScores = showTopScores();

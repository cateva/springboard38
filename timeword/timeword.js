//npm i num-words

const numWords = require('num-words')


class TimeWord {

  /** parse minute & hour from text.*/

  constructor(text) {

    let time = text.split(":");
    this.hr = parseInt(time[0]); 
    this.min = parseInt(time[1]);
    this.convert();
  }

  /** function for converting to text */
  
  convert() {
    let result; 
    let hr_eng;
    let min_eng;
    let am_pm;
    let out = [];


/**  0) special cases
00:00	midnight              
12:00	noon                
*/
if ( this.hr === 0 && this.min === 0) {
  result = "midnight";
  console.log(result);
  return result;
}

if ( this.hr === 12 && this.min === 0) {
  result = "noon";
  return result;
}

/**   1) general cases
 */

 hr_eng = numWords(this.hr)
 min_eng = numWords(this.min)

 if ( this.min > 0 && this.min < 10 ){
  min_eng = `oh ${min_eng}`
 }

 if ( this.min === 0 ){
  min_eng = "o’clock";
 }

 out.push(hr_eng);
 out.push(min_eng);



/**  2) define o'clock
01:00	one o’clock am 
*/
    if (this.min === 0 ){
      min_eng = "o’clock";
    }


/**   3) define am & pm 
0 - 11: am     
12 - 23: pm
*/
  if (this.hr > 11) {
    am_pm = "pm"
  } else {
    am_pm = "am"
  }

  out.push(am_pm);
  result = out.join(" ");



    return result;
  }
}


module.exports = {
  TimeWord,
};

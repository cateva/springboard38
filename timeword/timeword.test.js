
const { TimeWord } = require('./timeword');


describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof TimeWord).toBe('function');
  });
});



describe('output', () => {
  

  test('12:12	returns twelve fourteen pm', () => {
    let x = new TimeWord("12:14");
    let y = x.convert();

    expect(y).toEqual('twelve fourteen pm');
  });

  test('00:00	returns midnight', () => {
    let x = new TimeWord("00:00");
    let y = x.convert();

    expect(y).toEqual('midnight');
  });

  test('10:01	returns ten oh one am', () => {
    let x = new TimeWord("10:01");
    let y = x.convert();

    expect(y).toEqual('ten oh one am');
  });

  test('12:00	returns noon', () => {
    let x = new TimeWord("12:00");
    let y = x.convert();

    expect(y).toEqual('noon');
  });


  test('01:00	returns one o’clock am', () => {
    let x = new TimeWord("01:00");
    let y = x.convert();

    expect(y).toEqual('one o’clock am');
  });

});
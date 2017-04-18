//1 step - get content

let events = require('./backend/events');
let tags = require('./backend/tags');
//2 step - create checking method by tokens in text
function eventHasToken(text, token) {
  return (
    text.indexOf(`${token} `) === 0 ||
    text.indexOf(` ${token} `) > 0 ||
    text.indexOf(` ${token}`) === (text.length - ` ${token}`.length)
	);
}
//3 step - create a method for analyzing the received events
function checkEvents(events, tags) {
	events.forEach(event => {
 	 	event.labels = [];
    let text = event.title + ' ' + event.description;
    text = text.toLowerCase();
    tags.forEach(tag => {
    tag.token.forEach(token => {
      if (eventHasToken(text, token)) {
        event.labels.push(tag.label);
        }
			});
		});
	});
}
checkEvents(events, tags);
//4 step - write JSON file with checked events
let fs = require('fs');
let eventsJSON = JSON.stringify(events, null, 2);
fs.writeFileSync('./backend/checked-events.json', eventsJSON);
// TODO Read JS collections: Array, Map, Set.
// TODO try regex /($tag| tag |tag^)/
function testFunc() {
	let a = 100;

}
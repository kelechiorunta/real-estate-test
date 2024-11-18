// import * as view from 'my-sevices'

import view from './super.mjs' with {text : 'json'};
const { greetings } = view;
console.log(greetings)
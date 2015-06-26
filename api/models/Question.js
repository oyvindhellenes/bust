/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	text: {
  		type: 'String',
  		required: true
  	},
  	choices: {
  		type: 'Array',
  		required: true
  	},
  	answer: {
  		type: 'String',
  		required: true
  	},
  	chapter: 'integer',
  	book: {
  		model: 'book',
  		required: true
  	},
    count: {
      type: 'integer',
      defaultsTo: 0
    },
    correctCount: 'integer',
    score: {
      type: 'integer',
      defaultsTo: 50
    }
  }
};


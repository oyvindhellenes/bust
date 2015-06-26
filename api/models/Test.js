/**
* Test.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	questions: {
  		collection: 'question'
  	},
  	result: 'integer',
  	finishedAt: {
  		type: 'datetime'
  	},
  	difficulty: {
  		type: 'integer',
  		max: 4,
  		min: 1,
  		required: true
  	},
  	tester: {
  		model: 'user'
  	}
  }
};


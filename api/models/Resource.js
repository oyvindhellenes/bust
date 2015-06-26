/**
 * Resource.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var EMBEDLY_KEY = '66f17f93fa884646a88c25cc4a78e9f5';

var embedly = require('embedly'),
  util = require('util');

module.exports = {

  attributes: {
    url: {
      type: 'string'
    },
    title: 'string',
    name: 'string',
    type: 'string',
    poster_id: 'string',
    poster_name: 'string',
    poster_img: 'string',
    vote: {
      type: 'integer',
      defaultsTo: 0
    },
    description: 'string',
    note: {
      type: 'string',
      defaultsTo: ''
    },
    image_url: {
      type: 'string',
      defaultsTo: 'images/link.png'
    },
    img_width: 'integer',
    img_height: 'integer',
    provider_name: 'string',
    provider_url: 'string',
    provider_favicon: 'string',
    text: 'string',
    index: {
      type: 'integer',
      defaultsTo: 0
    },
    master: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  // beforeCreate: function(values, next) {

  //   if(values.title){
  //     values.name = values.title;
  //   }

  //   if(values.url){
  //     values.url_normalized = HelperFunctionsService.normalizeUrl(values.url, true, true);
  //   }

  //   if(values.master){
  //     values.master = true;
  //     Resource.findOne()
  //       .where({
  //         url_normalized: HelperFunctionsService.normalizeUrl(values.url, true, true),
  //         master: true
  //       })
  //       .exec(function(error, resource){
  //         if(resource){
  //           values.master = false;
  //           values.name = resource.title;
  //           values.title = resource.title;
  //           values.image_url = resource.image_url;
  //           values.img_width = resource.img_width;
  //           values.img_height = resource.img_height;
  //           values.provider_name = resource.provider_name;
  //           values.provider_url = resource.provider_url;
  //           values.provider_favicon = resource.provider_favicon;
  //         }
  //         next();
  //     });
  //   }
  //   else{
  //     values.master = false;
  //     next();
  //   }

  // },
  afterCreate: function(values, next) {
    if (!values.master) {
      next();
    }
    else {
      Resource.findOne(values.id, function(err, obj) {
        new embedly({
          key: EMBEDLY_KEY
        }, function(err, api) {
          if (!!err) {
            console.error('Error creating Embedly api');
            console.error(err.stack, api);
            console.log(err);
            next();
          }
          var url = obj.url;
          api.extract({
            url: url
          }, function(err, objs) {
            if (!!err) {
              console.error('request #1 failed');
              console.error(err.stack, objs);
              next();
            }
            obj.title = objs[0].title;
            obj.description = objs[0].description;
            obj.provider_name = objs[0].provider_display;
            obj.provider_url = objs[0].provider_url;
            obj.provider_favicon = objs[0].favicon_url;
            obj.master = true;
            obj.index = values.index;

            if (objs[0].media.type) {
              obj.type = objs[0].media.type;
            };

            if (objs[0].images[0]) {
              obj.image_url = objs[0].images[0].url;
              obj.img_width = objs[0].images[0].width;
              obj.img_height = objs[0].images[0].height;
            }

            obj.save(function(err, result) {

              next();

            })
          });
        });

      })

    }

  }

};

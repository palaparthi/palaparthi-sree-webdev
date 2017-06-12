/**
 * Created by Palaparthi on 6/10/17.
 */

var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({

    _page : {type : mongoose.Schema.Types.ObjectId , ref: "PageModel"},
    type: String,
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    position: Number,
    dateCreated: String
    }, {collection : 'widget'}
);

module.exports = widgetSchema;
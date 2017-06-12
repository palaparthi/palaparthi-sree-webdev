/**
 * Created by Palaparthi on 6/9/17.
 */

var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");

var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage=addPage;
websiteModel.deletePage=deletePage;

module.exports = websiteModel;


function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index,1);
            return website.save();
        });
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel.addWebsite(userId,website._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user : userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    delete newWebsite.dateCreated;
    return websiteModel.update({_id : websiteId}, {$set : newWebsite});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel.remove({_id : websiteId})
        .then(function (website) {
            return userModel.deleteWebsite(userId, websiteId)
        });
}

'use strict';

var translation = null,
    translationRu = require('./translation-ru');

module.exports = {

    translate: function customTranslate(template, replacements) {
        if (!translation) return template;

        replacements = replacements || {};

        template = translation[template] || template;

        return template.replace(/{([^}]+)}/g, function(_, key) {
            return replacements[key] || '{' + key + '}';
        });

    },

    initLocale: function(locale) {
        switch(locale) {
            case 'ru': translation = translationRu; break;
            default: translation = null;
        };
    }

};
"use strict";
(function () {
    // TemplateProcessor constructor
    function TemplateProcessor(template) {
      this.template = template;
    }
  
    // Prototype method to fill in the template
    TemplateProcessor.prototype.fillIn = function (dictionary) {
      // Regular expression to match {{property}} pattern
      var regex = /{{(.*?)}}/g;
  
      // Replace matches with corresponding property from the dictionary
      var filledTemplate = this.template.replace(regex, function (match, property) {
        // Check if the property exists in the dictionary
        if (dictionary.hasOwnProperty(property)) {
          return dictionary[property];
        } else {
          // If the property is not found, replace it with an empty string
          return '';
        }
      });
  
      return filledTemplate;
    };
  
    // Export TemplateProcessor to the global namespace
    window.TemplateProcessor = TemplateProcessor;
  })();
  
(function () {
  "use strict";
   
  function select(selector, context) {
    return Sizzle(selector, context);
  }
   
  /**
   * Camel-case CSS property names
   * 
   * We need to do this because JS properties equivilent to CSS are
   * all in camelCase due to language restrictions.
   * 
   * @param string str This is the CSS property name in valid CSS form.
   * @return string This is the CSS property name which in valid JS form.
   */
  function camelCaseCSS(str) {
    return str.replace(/\-([a-z])/g, 
		       function (whole, section) {
			 return section.toUpperCase();
		       });
  }
   
  /**
   * Determine if property given is a valid CSS property.
   * 
   * We have to do this so we can determine how to treat it. Right now
   * Jas is one step ahead of CSS and has 2 valid types of object inside
   * a rule body: it can have properties and more rules (nested rules)
   */ 
  function isValidCSSProperty(element, property) {
    if (typeof element.style[property] != "undefined") {
      return true;
    }
    
    return false;
  }
  
   
  function jas(rules, context) {
    if (typeof rules == "undefined") {
      return;
    }
    
    context = context || document;
    
    var rule,
        properties,
        elements, element,
        elementsLen,
        i,
        propName, jsPropName,
        sizzled;
        
    for (rule in rules) {
      properties  = rules[rule];
      elements    = select(rule);
      elementsLen = elements.length;
      
      // Behave like CSS. If no elements match, just move right on.
      if (elementsLen < 1) {
        continue;
      }
      
      for (i = 0; i < elementsLen; i++) {
        for (propName in properties) {
          element = elements[i];
	  // We must have the property names in forms JS can accept.
	  // It may be a good idea to build a table of commonly
	  // used properties.
          jsPropName = camelCaseCSS(propName);
	  
	  // We need to know if this is a valid property to determine
	  // how to treat it. If it's not valid, we must assume it's a
	  // nested rule. It's all about traversin' that tree.
          if (isValidCSSProperty(element, jsPropName)) {
            element.style[jsPropName] = properties[propName];            
          }
          
          else {
            sizzled = {};
            sizzled[propName] = properties[propName];
            jas(sizzled, element);
          }
        }
      }
    }
  }
  
  jas.rgb = function (r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  };
  
  // Global it!
  window.jas = jas;
}());
(function () {
  "use strict";
  
  function select(selector, context) {
    return Sizzle(selector, context);
  }
  
  function camelCaseCSS(str) {
    var segments = str.split('-'),
        segsLen = segments.length,
        i,
        newString = '',
        currSeg;
    
    // Camel case all segments except the first.
    // Probably could do with some optimisation.
    newString = segments[0];
    for (i = 1; i < segsLen; i++) {
      currSeg = segments[i]
      newString = newString 
                + currSeg.substring(0, 1).toUpperCase()
                + currSeg.substring(1);
    }
    return newString;
  }
  
  function isValidCSSProperty(element, property) {
    if (typeof element.style[property] != "undefined") {
      return true;
    }
    
    return false;
  }
  
  function jas(rules, context) {
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
      for (i = 0; i < elementsLen; i++) {
        for (propName in properties) {
          element = elements[i];
          jsPropName = camelCaseCSS(propName);
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
  
  jas.html = function (element) {
    console.log(this);
    return 'one';
  };
  
  jas.ELEMENTS
  
  // Global it!
  window.jas = jas;
}());
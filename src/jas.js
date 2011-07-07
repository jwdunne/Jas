(function () {
  "use strict";
  function select(selector) {
    return Sizzle(selector);
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
  
  function jas(rules) {
    var rule,
        properties,
        elements,
        elementsLen,
        i,
        propName, jsPropName;
        
        
    for (rule in rules) {
      properties  = rules[rule];
      elements    = select(rule);
      elementsLen = elements.length;
      for (i = 0; i < elementsLen; i++) {
        for (propName in properties) {
          jsPropName = camelCaseCSS(propName);
          elements[i].style[jsPropName] = properties[propName];
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
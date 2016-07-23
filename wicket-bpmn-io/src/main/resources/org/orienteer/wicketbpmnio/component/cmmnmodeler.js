var propertiesPanelModule = require('cmmn-js-properties-panel'),
    propertiesProviderModule = require('cmmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-cmmn-moddle/resources/camunda'),
    CmmnModeler = require('cmmn-js/lib/Modeler');

window.installCmmnModeler = function(container, parent) {
  var cmmnModeler = new CmmnModeler({
    container: '#' + container,
    propertiesPanel: {
      parent: '#' + parent
    },
    additionalModules: [
      propertiesPanelModule,
      propertiesProviderModule
    ],
    moddleExtensions: {
      camunda: camundaModdleDescriptor
    }
  });
};
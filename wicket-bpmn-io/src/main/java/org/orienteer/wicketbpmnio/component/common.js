var BpmnJS = require('bpmn-js/lib/Modeler'),
    propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/bpmn');

var bpmnJS = new BpmnJS({
    additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
    ],
    container: '#canvas',
    propertiesPanel: {
        parent: '#properties'
    }
});
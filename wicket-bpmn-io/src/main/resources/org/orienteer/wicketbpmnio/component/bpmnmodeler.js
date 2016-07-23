var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda'),
    BpmnModeler = require('bpmn-js/lib/Modeler');

window.installBpmnModeler = function(container, parent) {

    var bpmnModeler = new BpmnModeler({
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
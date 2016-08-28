var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda'),
    BpmnModeler = require('bpmn-js/lib/Modeler'),
    localization = require('./localization');

var emptyXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
"<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" id=\"sample-diagram\" targetNamespace=\"http://bpmn.io/schema/bpmn\">"+
"  <bpmn2:process id=\"Process_1\" isExecutable=\"false\"><bpmn2:startEvent id=\"StartEvent_1\"/></bpmn2:process>"+
"  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">"+
"    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">"+
"      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">"+
"        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"412.0\" y=\"240.0\"/>"+
"      </bpmndi:BPMNShape>"+
"    </bpmndi:BPMNPlane>"+
"  </bpmndi:BPMNDiagram>"+
"</bpmn2:definitions>";

window.installBpmnModeler = function(componentId, xmlComponentId, locale) {

    localization.initLocale(locale);

    var customTranslate = {
        translate: ['value', localization.translate]
    };

    var bpmnModeler = new BpmnModeler({
        container: '#' + componentId + ' .canvas',
        propertiesPanel: {
            parent: '#' + componentId + ' .properties-panel'
        },
        additionalModules: [
            propertiesPanelModule,
            propertiesProviderModule,
            customTranslate
        ],
        moddleExtensions: {
            camunda: camundaModdleDescriptor
        }
    });

    function openDiagram(xml) {
        bpmnModeler.importXML(xml?xml:emptyXml, function(err) {
            if (err) {
            	alert(err);
            } else {
            	bpmnModeler.get('canvas').zoom('fit-viewport');
            }
        });
    };

    // function saveSVG(done) {
    //   bpmnModeler.saveSVG(done);
    // };
    //
    // function saveDiagram(done) {
    //
    //   bpmnModeler.saveXML({ format: true }, function(err, xml) {
    //     done(err, xml);
    //   });
    // };

    function registerFileDrop(container, callback) {

      function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files,
            file = files[0],
            reader = new FileReader();

        reader.onload = function(e) {
          var xml = e.target.result;
          callback(xml);
        };

        reader.readAsText(file);
      };

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }

      container.get(0).addEventListener('dragover', handleDragOver, false);
      container.get(0).addEventListener('drop', handleFileSelect, false);
    };

    if (!window.FileList || !window.FileReader) {
      window.alert(
        'Looks like you use an older browser that does not support drag and drop. ' +
        'Try using Chrome, Firefox or the Internet Explorer > 10.');
    } else {
      registerFileDrop($('#' + componentId + ' .canvas'), openDiagram);
    }
    
    function saveDiagram(done) {

      bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });
    };


//    $(document).on('ready', function() {
    $(function(){

        $('#'+componentId+' .buttons a').click(function(e) {
            if (!$(this).is('.active')) {
              e.preventDefault();
              e.stopPropagation();
            }
        });


        var debounce = require('lodash/function/debounce');

        var exportArtifacts = debounce(function() {

            saveDiagram(function(err, xml) {
                $('#' + xmlComponentId).val(xml);
            });
        }, 500);

        bpmnModeler.on('commandStack.changed', exportArtifacts);
        openDiagram($('#' + xmlComponentId).val());
    }); 

};
var propertiesPanelModule = require('bpmn-js-properties-panel'),
    propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda'),
    BpmnModeler = require('bpmn-js/lib/Modeler');

window.installBpmnModeler = function(componentId, diagramXML) {

    var bpmnModeler = new BpmnModeler({
        container: '#' + componentId + ' .canvas',
        propertiesPanel: {
            parent: '#' + componentId + ' .properties-panel'
        },
        additionalModules: [
            propertiesPanelModule,
            propertiesProviderModule
        ],
        moddleExtensions: {
            camunda: camundaModdleDescriptor
        }
    });

    function openDiagram(xml) {
        bpmnModeler.importXML(xml, function(err) {
            if (err) {
            	alert(err);
            } else {
            	bpmnModeler.get('canvas').zoom('fit-viewport');
            }
        });
    };

    function saveSVG(done) {
      bpmnModeler.saveSVG(done);
    };

    function saveDiagram(done) {

      bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });
    };

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

    $(document).on('ready', function() {
    	
    	openDiagram(diagramXML);

        var downloadLink = $('#'+componentId+' .download-diagram');
        var downloadSvgLink = $('#'+componentId+' .download-svg');

        $('#'+componentId+' .buttons a').click(function(e) {
            if (!$(this).is('.active')) {
              e.preventDefault();
              e.stopPropagation();
            }
        });

        function setEncoded(link, name, data) {
            var encodedData = encodeURIComponent(data);

            if (data) {
              link.addClass('active').attr({
                'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                'download': name
              });
            } else {
              link.removeClass('active');
            }
        }

        var debounce = require('lodash/function/debounce');

        var exportArtifacts = debounce(function() {
            saveSVG(function(err, svg) {
              setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
            });

            saveDiagram(function(err, xml) {
              setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
            });
        }, 500);

        bpmnModeler.on('commandStack.changed', exportArtifacts);
    }); 

};
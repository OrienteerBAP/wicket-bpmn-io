var propertiesPanelModule = require('cmmn-js-properties-panel'),
    propertiesProviderModule = require('cmmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-cmmn-moddle/resources/camunda'),
    CmmnModeler = require('cmmn-js/lib/Modeler');

window.installCmmnModeler = function(componentId, diagramXml) {
  var cmmnModeler = new CmmnModeler({
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
    cmmnModeler.importXML(xml, function(err) {
      if (err) {
        alert(err);
      }
    });
  };

  function saveSVG(done) {
    cmmnModeler.saveSVG(done);
  };

  function saveDiagram(done) {
    cmmnModeler.saveXML({ format: true }, function(err, xml) {
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
    };

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
    openDiagram(diagramXml);

    var downloadLink = $('#'+componentId+' .download-diagram'),
        downloadSvgLink = $('#'+componentId+' .download-svg');

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
          'href': 'data:application/cmmn11-xml;charset=UTF-8,' + encodedData,
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
        setEncoded(downloadLink, 'diagram.cmmn', err ? null : xml);
      });
    }, 500);

    cmmnModeler.on('commandStack.changed', exportArtifacts);
  });
};
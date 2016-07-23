var propertiesPanelModule = require('cmmn-js-properties-panel'),
    propertiesProviderModule = require('cmmn-js-properties-panel/lib/provider/camunda'),
    camundaModdleDescriptor = require('camunda-cmmn-moddle/resources/camunda'),
    CmmnModeler = require('cmmn-js/lib/Modeler');

window.installCmmnModeler = function(canvas, parent, container, diagramXml) {
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

  function createNewDiagram() {
    openDiagram(diagramXML);
  };

  function openDiagram(xml) {
    cmmnModeler.importXML(xml, function(err) {
      if (err) {
        container
          .removeClass('with-diagram')
          .addClass('with-error');

        container.find('.error pre').text(err.message);

        console.error(err);
      } else {
        container
          .removeClass('with-error')
          .addClass('with-diagram');
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

      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };

    container.get(0).addEventListener('dragover', handleDragOver, false);
    container.get(0).addEventListener('drop', handleFileSelect, false);
  };

  if (!window.FileList || !window.FileReader) {
    window.alert(
      'Looks like you use an older browser that does not support drag and drop. ' +
      'Try using Chrome, Firefox or the Internet Explorer > 10.');
  } else {
    registerFileDrop(container, openDiagram);
  }

  $(document).on('ready', function() {
    $('#js-create-diagram').click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      createNewDiagram();
    });

    var downloadLink = $('#js-download-diagram'),
        downloadSvgLink = $('#js-download-svg');

    $('.buttons a').click(function(e) {
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
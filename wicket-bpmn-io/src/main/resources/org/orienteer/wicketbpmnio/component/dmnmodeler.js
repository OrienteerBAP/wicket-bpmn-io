var DmnModeler = require('dmn-js/lib/Modeler');

window.installDmnModeler = function(componentId, diagramXml, canvas, container, download, newTableXml, exampleXml) {
	var dirty = false,
		originalXML = '',
		latestXML = '';

	var renderer = new DmnModeler({
	  container: '#' + componentId + ' .canvas',
	  keyboard: { bindTo: document },
	  tableName: 'DMN Table'
	});

	function setEncoded(link, name, data) {
		var encodedData = encodeURIComponent(data);

		dirty = data !== originalXML;
		latestXML = data;

		if (data) {
			link.addClass('active').attr({
			  'href': 'data:application/xml;charset=UTF-8,' + encodedData,
			  'download': name
			});
		} else {
			link.removeClass('active');
		}
	};

	function openTable(xml) {
		renderer.importXML(xml, function(err) {
			if (err) {
			  alert(err);
			}
		});
	};

	function saveTable(done) {
		renderer.saveXML({ format: true }, function(err, xml) {
			done(err, xml);
		});
	};

	function registerFileDrop(container, callback) {
		function handleFileSelect(e) {
			e.stopPropagation();
			e.preventDefault();

			if(dirty && !window.confirm('You made changes to the previous table, ' +
			      'do you really want to load the new table and overwrite the changes?')) {
			  return;
			}

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
	  registerFileDrop($('#' + componentId + ' .canvas'), openTable);
	}

	$(document).on('ready', function() {
		openTable(diagramXml);

		$('#'+componentId+' .buttons a').click(function(e) {
			if (!$(this).is('.active')) {
				e.preventDefault();
				e.stopPropagation();
			}
		});

		function checkDirty() {
			if (dirty) {
				return 'The changes you performed on the table will be lost upon navigation.';
			}
		}

		window.onbeforeunload = checkDirty;

		renderer.on('commandStack.changed', exportArtifacts);
	});
};
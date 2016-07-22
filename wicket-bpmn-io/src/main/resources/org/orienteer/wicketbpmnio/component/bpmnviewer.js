var BpmnViewer = require('bpmn-js');

window.installBpmnViewer = function(id, xml) {

	var viewer = new BpmnViewer({ container: '#' + id });

	xml = xml.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g, '"');

	viewer.importXML(xml, function(err) {

	  if (!err) {
	    viewer.get('canvas').zoom('fit-viewport');
	  } else {
	    console.log('something went wrong:', err);
	  }
	});
};
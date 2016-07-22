var BpmnViewer = require('bpmn-js');

window.installBpmnViewer = function(id, xml) {

	var viewer = new BpmnViewer({ container: '#' + id });

	viewer.importXML(/*pizzaDiagram*/xml, function(err) {

	  if (!err) {
	    console.log('success!');
	    viewer.get('canvas').zoom('fit-viewport');
	  } else {
	    console.log('something went wrong:', err);
	  }
	});

	// console.log(id);

}
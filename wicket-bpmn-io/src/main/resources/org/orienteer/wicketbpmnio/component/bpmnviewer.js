function installBpmnViewer(id, xml) {
// 	var elm = $('#'+id);
// 	elm.text(xml);
// }


	var BpmnViewer = require('bpmn-js');


	var viewer = new BpmnViewer({ container: '#' + id });

	viewer.importXML(/*pizzaDiagram*/xml, function(err) {

	  if (!err) {
	    console.log('success!');
	    viewer.get('canvas').zoom('fit-viewport');
	  } else {
	    console.log('something went wrong:', err);
	  }
	});

}
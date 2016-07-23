var DmnViewer = require('dmn-js');


window.installDmnViewer = function(id, xml) {

	var viewer = new DmnViewer({ container: '#' + id });

	viewer.importXML(xml, function(err) {
	  if (!err) {
	    console.log('success!');
	  } else {
	    console.log('something went wrong:', err);
	  }
	});
};


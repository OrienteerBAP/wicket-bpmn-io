var CmmnViewer = require('cmmn-js');

window.installCmmnViewer = function(id, xml) {

	var viewer = new CmmnViewer({ container: '#' + id });

	viewer.importXML(xml, function(err) {

	  if (!err) {
	  	console.log('success');
	  } else {
	    console.log('something went wrong:', err);
	  }
	});
};
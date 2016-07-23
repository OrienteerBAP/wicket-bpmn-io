var DmnModeler = require('dmn-js/lib/Modeler');

window.installDmnModeler = function(container, parent) {

	var renderer = new DmnModeler({
	  container: '#' + container,
	  keyboard: { bindTo: document },
	  tableName: 'DMN Table'
	});
};
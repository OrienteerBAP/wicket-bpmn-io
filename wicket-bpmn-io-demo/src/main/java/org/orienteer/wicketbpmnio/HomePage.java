package org.orienteer.wicketbpmnio;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.util.io.IOUtils;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;
import org.orienteer.wicketbpmnio.component.BpmnViewer;
//import org.apache.wicket.devutils.debugbar.DebugBar;

public class HomePage extends WebPage {
	private static final long serialVersionUID = 1L;
	
	public HomePage(final PageParameters parameters) {
		super(parameters);
		TextTemplate exampleXml = new PackageTextTemplate(HomePage.class, "example.bpmn");
		add(new BpmnViewer("bpmnViewer", Model.of(exampleXml.asString())));
    }
	
}

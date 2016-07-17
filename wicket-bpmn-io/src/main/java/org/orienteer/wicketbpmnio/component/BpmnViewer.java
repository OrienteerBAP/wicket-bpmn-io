package org.orienteer.wicketbpmnio.component;

import java.util.HashMap;
import java.util.Map;

import org.apache.wicket.core.util.string.JavaScriptUtils;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.OnDomReadyHeaderItem;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.string.Strings;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;

public class BpmnViewer extends GenericPanel<String> {

	private static final JavaScriptResourceReference BPMN_VIEWER_JS = new JavaScriptResourceReference(BpmnViewer.class, "bpmnviewer.js");
	
	public BpmnViewer(String id, IModel<String> xmlModel) {
		super(id, xmlModel);
		setOutputMarkupId(true);
	}
	
	@Override
	public void renderHead(IHeaderResponse response) {
		super.renderHead(response);
		response.render(JavaScriptHeaderItem.forReference(BPMN_VIEWER_JS));
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("componentId", getMarkupId());
		params.put("xml", escapeAndWrapAsJavaScriptString(getDefaultModelObjectAsString()));
		TextTemplate template = new PackageTextTemplate(BpmnViewer.class, "bpmnviewer.tmpl.js");
		response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
	}
	
	public static final CharSequence escapeAndWrapAsJavaScriptString(CharSequence content) {
		if(content==null) return "null";
		else {
			content = JavaScriptUtils.escapeQuotes(content);
			content = "\"" + content + "\""; 
			content = Strings.replaceAll(content, "\n", "\" + \n\"");
			return content;
		}
	}
	
}

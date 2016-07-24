package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.core.util.string.JavaScriptUtils;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.util.string.Strings;

public class AbstractBpmnIoPanel extends GenericPanel<String> {

	public AbstractBpmnIoPanel(String id, IModel<String> xmlModel) {
		super(id, xmlModel);
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
	
	@Override
	protected void onComponentTag(ComponentTag tag) {
		super.onComponentTag(tag);
		tag.append("class", "bpmn", " ");
	}
	
}

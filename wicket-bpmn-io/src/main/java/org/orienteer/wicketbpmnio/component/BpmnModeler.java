package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.OnDomReadyHeaderItem;
import org.apache.wicket.markup.html.form.HiddenField;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.CssResourceReference;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by KMukhov on 22.07.2016.
 */
public class BpmnModeler extends AbstractBpmnIoPanel {
	
	private static final CssResourceReference STYLE_CSS = new CssResourceReference(BpmnModeler.class, "style.css");
	private static final CssResourceReference DIAGRAM_CSS = new CssResourceReference(BpmnModeler.class, "css/diagram-js.css");
	private static final CssResourceReference BPMN_CSS = new CssResourceReference(BpmnModeler.class, "vendor/bpmn-font/css/bpmn-embedded.css");
    private static final JavaScriptResourceReference BPMN_MODELER_JS = new JavaScriptResourceReference(BpmnModeler.class, "bpmnmodeler.min.js");

    private HiddenField<String> xml;

    public BpmnModeler(String id, IModel<String> xmlModel) {
        super(id, xmlModel);
        xml = new HiddenField<String>("xml", xmlModel);
        xml.setOutputMarkupId(true);

        add(xml);
        setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(CssHeaderItem.forReference(STYLE_CSS));
        response.render(CssHeaderItem.forReference(DIAGRAM_CSS));
        response.render(CssHeaderItem.forReference(BPMN_CSS));
        response.render(JavaScriptHeaderItem.forReference(BPMN_MODELER_JS));



        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", getMarkupId());
        params.put("xmlComponentId", xml.getMarkupId());
        params.put("lang", getLocale().getLanguage());
        TextTemplate template = new PackageTextTemplate(BpmnModeler.class, "bpmnmodeler.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

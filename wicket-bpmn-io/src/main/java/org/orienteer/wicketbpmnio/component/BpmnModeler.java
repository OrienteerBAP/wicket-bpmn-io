package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.OnDomReadyHeaderItem;
import org.apache.wicket.markup.html.panel.GenericPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by KMukhov on 22.07.2016.
 */
public class BpmnModeler extends GenericPanel<String> {

    private static final JavaScriptResourceReference BPMN_MODELER_JS = new JavaScriptResourceReference(BpmnModeler.class, "bpmnmodeler.js");

    public BpmnModeler(String container, String parent) {
        super(container, null); // DELETE
        //super(container, parent);
        //setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(JavaScriptHeaderItem.forReference(BPMN_MODELER_JS));

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", "#ID");
        params.put("parentId", "#parentID");
        TextTemplate template = new PackageTextTemplate(BpmnModeler.class, "bpmnmodeler.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.OnDomReadyHeaderItem;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.CssResourceReference;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Kirill Mukhov
 */
public class CmmnModeler extends AbstractBpmnIoPanel {

    private static final JavaScriptResourceReference CMMN_MODELER_JS = new JavaScriptResourceReference(CmmnModeler.class, "cmmnmodeler.min.js");
    private static final CssResourceReference DIAGRAM_CSS = new CssResourceReference(CmmnModeler.class, "css/diagram-js.css");
    private static final CssResourceReference STYLE_CSS = new CssResourceReference(CmmnModeler.class, "style.css");
    private static final CssResourceReference CMMN_CSS = new CssResourceReference(CmmnModeler.class, "vendor/cmmn-font/css/cmmn-embedded.css");

    public CmmnModeler(String id, IModel<String> xmlModel) {
        super(id, xmlModel);
        setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(CssHeaderItem.forReference(STYLE_CSS));
        response.render(CssHeaderItem.forReference(DIAGRAM_CSS));
        response.render(CssHeaderItem.forReference(CMMN_CSS));
        response.render(JavaScriptHeaderItem.forReference(CMMN_MODELER_JS));

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", getMarkup());
        params.put("xml", escapeAndWrapAsJavaScriptString(getModelObject()));
        TextTemplate template = new PackageTextTemplate(CmmnModeler.class, "cmmnmodeler.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

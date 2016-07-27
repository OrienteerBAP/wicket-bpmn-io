package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.markup.head.CssReferenceHeaderItem;
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
 * Created by Kmukhov on 27.07.2016.
 */
public class DmnModeler extends AbstractBpmnIoPanel {

    private static final JavaScriptResourceReference DMN_MODELER_JS = new JavaScriptResourceReference(DmnModeler.class, "dmnmodeler.min.js");
    private static final CssResourceReference DMN_CSS = new CssResourceReference(DmnModeler.class, "css/dmn-js.css");
    private static final CssResourceReference STYLE_CSS = new CssResourceReference(DmnModeler.class, "style.css");

    public DmnModeler(String id, IModel<String> xmlModel) {
        super(id, xmlModel);
        setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(JavaScriptHeaderItem.forReference(DMN_MODELER_JS));
        response.render(CssReferenceHeaderItem.forReference(DMN_CSS));
        response.render(CssReferenceHeaderItem.forReference(STYLE_CSS));

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", getMarkupId());
        params.put("xml", escapeAndWrapAsJavaScriptString(getModelObject()));
        TextTemplate template = new PackageTextTemplate(DmnModeler.class, "dmnmodeler.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

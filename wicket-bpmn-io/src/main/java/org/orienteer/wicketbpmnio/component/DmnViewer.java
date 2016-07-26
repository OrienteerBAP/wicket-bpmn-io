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
 * @author Kirill Mukhov
 */
public class DmnViewer extends AbstractBpmnIoPanel {

    private static final JavaScriptResourceReference DMN_VIEWER_JS = new JavaScriptResourceReference(DmnViewer.class, "dmnviewer.min.js");
    private static final CssResourceReference DMN_CSS = new CssResourceReference(DmnViewer.class, "css/dmn-js.css");

    public DmnViewer(String id, IModel<String> xmlModel) {
        super(id, xmlModel);
        setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(CssReferenceHeaderItem.forReference(DMN_CSS));
        response.render(JavaScriptHeaderItem.forReference(DMN_VIEWER_JS));

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", getMarkupId());
        params.put("xml", escapeAndWrapAsJavaScriptString(getModelObject()));
        TextTemplate template = new PackageTextTemplate(BpmnViewer.class, "dmnviewer.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

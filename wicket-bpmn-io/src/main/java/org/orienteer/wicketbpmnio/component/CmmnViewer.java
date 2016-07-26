package org.orienteer.wicketbpmnio.component;

import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.head.OnDomReadyHeaderItem;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.template.PackageTextTemplate;
import org.apache.wicket.util.template.TextTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Kirill Mukhov
 */
public class CmmnViewer extends AbstractBpmnIoPanel {

    private static final JavaScriptResourceReference CMMN_VIEWER_JS = new JavaScriptResourceReference(CmmnViewer.class, "cmmnviewer.min.js");

    public CmmnViewer(String id, IModel<String> xmlModel) {
        super(id, xmlModel);
        setOutputMarkupId(true);
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(JavaScriptHeaderItem.forReference(CMMN_VIEWER_JS));

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("componentId", getMarkupId());
        params.put("xml", escapeAndWrapAsJavaScriptString(getModelObject()));
        TextTemplate template = new PackageTextTemplate(CmmnViewer.class, "cmmnviewer.tmpl.js");
        response.render(OnDomReadyHeaderItem.forScript(template.asString(params)));
    }
}

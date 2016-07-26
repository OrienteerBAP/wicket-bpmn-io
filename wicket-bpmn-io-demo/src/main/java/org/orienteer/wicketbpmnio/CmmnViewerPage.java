package org.orienteer.wicketbpmnio;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.orienteer.wicketbpmnio.component.CmmnViewer;

/**
 * @author Kirill Mukhov
 */
public class CmmnViewerPage extends WebPage {

    private static final String XML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<cmmn:definitions xmlns:dc=\"http://www.omg.org/spec/CMMN/20151109/DC\" xmlns:di=\"http://www.omg.org/spec/CMMN/20151109/DI\" xmlns:cmmndi=\"http://www.omg.org/spec/CMMN/20151109/CMMNDI\" xmlns:cmmn=\"http://www.omg.org/spec/CMMN/20151109/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"Test\" targetNamespace=\"http://bpmn.io/schema/cmmn\">\n" +
            "  <cmmn:case id=\"Case_1\">\n" +
            "    <cmmn:casePlanModel id=\"CasePlanModel_1\" name=\"A CasePlanModel\">\n" +
            "      <cmmn:planItem id=\"PlanItem_1\" definitionRef=\"Task_1\" />\n" +
            "      <cmmn:task id=\"Task_1\" />\n" +
            "    </cmmn:casePlanModel>\n" +
            "  </cmmn:case>\n" +
            "  <cmmndi:CMMNDI>\n" +
            "    <cmmndi:CMMNDiagram id=\"_5a66685b-5f57-4e2f-b1d1-acca4fae04b2\">\n" +
            "      <cmmndi:Size xsi:type=\"dc:Dimension\" width=\"500\" height=\"500\" />\n" +
            "      <cmmndi:CMMNShape id=\"DI_CasePlanModel_1\" cmmnElementRef=\"CasePlanModel_1\">\n" +
            "        <dc:Bounds x=\"114\" y=\"63\" width=\"534\" height=\"389\" />\n" +
            "        <cmmndi:CMMNLabel />\n" +
            "      </cmmndi:CMMNShape>\n" +
            "      <cmmndi:CMMNShape id=\"PlanItem_1_di\" cmmnElementRef=\"PlanItem_1\">\n" +
            "        <dc:Bounds x=\"150\" y=\"96\" width=\"100\" height=\"80\" />\n" +
            "        <cmmndi:CMMNLabel />\n" +
            "      </cmmndi:CMMNShape>\n" +
            "    </cmmndi:CMMNDiagram>\n" +
            "  </cmmndi:CMMNDI>\n" +
            "</cmmn:definitions>";

    public CmmnViewerPage(final PageParameters parameters) {
        super(parameters);
        add(new CmmnViewer("cmmnViewer", Model.of(XML)));
    }
}

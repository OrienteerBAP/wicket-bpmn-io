package org.orienteer.wicketbpmnio;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.orienteer.wicketbpmnio.component.DmnViewer;

/**
 * @author Kirill Mukhov
 */
public class DmnViewerPage extends WebPage {

    private static final String XML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<definitions xmlns=\"http://www.omg.org/spec/DMN/20151101/dmn11.xsd\"\n" +
            "             id=\"definitions\"\n" +
            "             name=\"definitions\"\n" +
            "             namespace=\"http://camunda.org/schema/1.0/dmn\">\n" +
            "  <decision id=\"decision\" name=\"Check Order\">\n" +
            "    <decisionTable id=\"decisionTable\">\n" +
            "      <input id=\"input1\" label=\"Customer Status\">\n" +
            "        <inputExpression id=\"inputExpression1\" typeRef=\"string\">\n" +
            "          <text>status</text>\n" +
            "        </inputExpression>\n" +
            "      </input>\n" +
            "      <input id=\"input2\" label=\"Order Sum\">\n" +
            "        <inputExpression id=\"inputExpression2\" typeRef=\"double\">\n" +
            "          <text>sum</text>\n" +
            "        </inputExpression>\n" +
            "      </input>\n" +
            "      <output id=\"output1\" label=\"Check Result\" name=\"result\" typeRef=\"string\" />\n" +
            "      <output id=\"output2\" label=\"Reason\" name=\"reason\" typeRef=\"string\" />\n" +
            "      <rule id=\"rule1\">\n" +
            "        <inputEntry id=\"inputEntry1\">\n" +
            "          <text>\"bronze\"</text>\n" +
            "        </inputEntry>\n" +
            "        <inputEntry id=\"inputEntry2\">\n" +
            "          <text></text>\n" +
            "        </inputEntry>\n" +
            "        <outputEntry id=\"outputEntry1\">\n" +
            "          <text>\"notok\"</text>\n" +
            "        </outputEntry>\n" +
            "        <outputEntry id=\"outputEntry2\">\n" +
            "          <text><![CDATA[\"work on your status first, as bronze you're not going to get anything\"]]></text>\n" +
            "        </outputEntry>\n" +
            "      </rule>\n" +
            "      <rule id=\"rule2\">\n" +
            "        <inputEntry id=\"inputEntry3\">\n" +
            "          <text>\"silver\"</text>\n" +
            "        </inputEntry>\n" +
            "        <inputEntry id=\"inputEntry4\">\n" +
            "          <text><![CDATA[< 1000]]></text>\n" +
            "        </inputEntry>\n" +
            "        <outputEntry id=\"outputEntry3\">\n" +
            "          <text>\"ok\"</text>\n" +
            "        </outputEntry>\n" +
            "        <outputEntry id=\"outputEntry4\">\n" +
            "          <text>\"you little fish will get what you want\"</text>\n" +
            "        </outputEntry>\n" +
            "      </rule>\n" +
            "      <rule id=\"rule3\">\n" +
            "        <inputEntry id=\"inputEntry5\">\n" +
            "          <text>\"silver\"</text>\n" +
            "        </inputEntry>\n" +
            "        <inputEntry id=\"inputEntry6\">\n" +
            "          <text><![CDATA[>= 1000]]></text>\n" +
            "        </inputEntry>\n" +
            "        <outputEntry id=\"outputEntry5\">\n" +
            "          <text>\"notok\"</text>\n" +
            "        </outputEntry>\n" +
            "        <outputEntry id=\"outputEntry6\">\n" +
            "          <text>\"you took too much man, you took too much!\"</text>\n" +
            "        </outputEntry>\n" +
            "      </rule>\n" +
            "      <rule id=\"rule4\">\n" +
            "        <inputEntry id=\"inputEntry7\">\n" +
            "          <text>\"gold\"</text>\n" +
            "        </inputEntry>\n" +
            "        <inputEntry id=\"inputEntry8\">\n" +
            "          <text></text>\n" +
            "        </inputEntry>\n" +
            "        <outputEntry id=\"outputEntry7\">\n" +
            "          <text>\"ok\"</text>\n" +
            "        </outputEntry>\n" +
            "        <outputEntry id=\"outputEntry8\">\n" +
            "          <text>\"you get anything you want\"</text>\n" +
            "        </outputEntry>\n" +
            "      </rule>\n" +
            "    </decisionTable>\n" +
            "  </decision>\n" +
            "</definitions>";

    public DmnViewerPage(final PageParameters parameters) {
        super(parameters);
        add(new DmnViewer("dmnViewer", Model.of(XML)));
    }
}

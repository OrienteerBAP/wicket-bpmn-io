package org.orienteer.wicketbpmnio;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;

/**
 * Application object for your web application.
 * If you want to run this application without deploying, run the Start class.
 *
 */
public class WicketApplication extends WebApplication
{
	/**
	 * @see org.apache.wicket.Application#getHomePage()
	 */
	@Override
	public Class<? extends WebPage> getHomePage()
	{
		return HomePage.class;
	}

	/**
	 * @see org.apache.wicket.Application#init()
	 */
	@Override
	public void init()
	{
		super.init();

		mountPage("/bpmnViewer", BpmnViewerPage.class);
		mountPage("/dmnViewer", DmnViewerPage.class);
		mountPage("/cmmnViewer", CmmnViewerPage.class);
		mountPage("/cmmnModeler", CmmnModelerPage.class);
		// add your configuration here
	}
}

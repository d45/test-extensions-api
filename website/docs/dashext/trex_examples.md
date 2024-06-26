---
title: Dashboard Extension Samples
description: Dashboard Extension Samples
---

The best way to learn how to build your own extensions is to look at the sample code. To examine the sample source files to see how Tableau dashboard extensions work, you can clone or download the [Extensions API](https://github.com/tableau/extensions-api) SDK on GitHub and run the samples or the tutorial.

- To download the Extensions API SDK, if you have not already done so, see [Get Started](./trex_getstarted).

- You can browse the sample code for the dashboard extensions in the [Samples](https://github.com/tableau/extensions-api/tree/master/Samples?=target="_blank") and the [Tutorial](https://github.com/tableau/extensions-api/tree/master/Tutorial?=target="_blank") folders on GitHub.

- You can also create dashboard extensions using TypeScript. See the TypeScript sample code in [Samples-TypeScript](https://github.com/tableau/extensions-api/tree/master/Samples-Typescript?=target="_blank") on GitHub.

- You can also check out the dashboard extensions from the community, see [Community Extensions](pathname:///community/).

---

The following instructions assume that you have already downloaded and extracted the files or have cloned the Extensions API SDK to your desktop.


### About the dashboard extension samples

The dashboard extension samples are in the `Samples` folder. There is also a step-by-step tutorial you can follow in the `Tutorial` folder.

The [Samples-Typescript](https://github.com/tableau/extensions-api/tree/master/Samples-Typescript) folder shows how you can use the Extensions API type definitions to create extensions in TypeScript. For more information, see [Use TypeScript with the Extensions API](../core/trex_typescript).




-   **[DataSources](https://github.com/tableau/extensions-api/tree/master/Samples/DataSources?=target="_blank")** 
     
    Shows how to use the `getDataSourcesAsync` function to find the names of the data sources for each worksheet in the dashboard. Like the Filtering sample, the DataSources sample makes use the `Promise.all` function to combine the promises from the asynchronous calls together, and then waits for them to resolve. 
 
-   **[Filtering](https://github.com/tableau/extensions-api/tree/master/Samples/Filtering?=target="_blank")** 

     Demonstrates how to use the `getFiltersAsync` function to find and display the active filters in the dashboard and calls the `addEventListener` function to set a `FilterChanged` event on each workbook in the dashboard. Any time a filter value is changed, the extension refreshes the table that displays the active filters. 

-   **[Parameters](https://github.com/tableau/extensions-api/tree/master/Samples/Parameters?=target="_blank")**
     
    Finds and displays all the parameters in the dashboard and then sets an event listener that waits for a parameter to change, which triggers a refresh. 

-   **[Settings](https://github.com/tableau/extensions-api/tree/master/Samples/Settings?=target="_blank")**
 
     Uses the `settings` namespace to save settings (key-value pairs) for the extension. Demonstrates how you can save settings for each instance of an extension, which enables sharing common views of a workbook.  

-   **[UINamespaces](https://github.com/tableau/extensions-api/tree/master/Samples/UINamespace?=target="_blank")**

     Demonstrates how you can use the `UI` namespace to create a modal dialog box (or popup) that runs another extension, which allows users to interact and change the settings for the parent extension. This sample controls the background auto-refresh interval for data sources in a dashboard. 


- **[Tutorial](https://github.com/tableau/extensions-api/tree/master/Tutorial?=target="_blank")**

     Walks you through the step-by-step process of creating and refining an extension that displays a summarized table of the currently selected marks.

- **[Samples-Typescript](https://github.com/tableau/extensions-api/tree/master/Samples-Typescript?=target="_blank")**

    The **Samples-Typescript** folder shows how you can use the Extensions API type definitions to create extensions in TypeScript. The sample extensions include TypeScript versions of many of the JavaScript samples. For more information, see [Use the TypeScript samples](#use-the-typescript-samples) and [Use TypeScript with the Extensions API](../core/trex_typescript).

- **[VizImage](https://github.com/tableau/extensions-api/tree/main/Samples/VizImage?=target="_blank")**

    Shows how you can use Tableau Viz to add visualizations to your dashboard extensions. This sample demonstrates the effects of different mark types and color palettes. For more information about Tableau Viz, see [Add Tableau Viz to Your Dashboard Extensions](../core/trex_tableau_viz).

- **[Formatting](https://github.com/tableau/extensions-api/tree/main/Samples/Formatting?=target="_blank")**

   Shows how you can access the CSS formatting in the Tableau workbook and apply it to the HTML elements in your dashboard extension. Create a consistent look and feel across the extension and the dashboard.


---
### Start a web server to host the sample dashboard extensions

To use the dashboard extension samples, you need to start up a web server on your computer to host the HTML pages. If you downloaded or cloned the Extensions API repository, you can start the web service in the root directory of the repository on your computer. These commands start the Node.js basic service `http-server`.

1. Go to the `extensions-api` folder.
1. To install the web server components, run the following command:

   ```cli
   npm install
   ```

1. To start the web server, run the following command:

   ```cli
   npm start
   ```

### Instructions for starting a web server on a different port

The samples are set up so that the web server is using port `8765`.  If you need to specify a different port instead of `8765`, you can change ports using another Node.js or `http-server` command.  

From the `extensions-api` folder, you can start the `http-server` using one of the following commands. Replace `PORT` with the port you are using (for example, `8000`).

To install the `http-server`on your computer globally and to also start the server: 

```cli
npm install http-server -g && http-server -p PORT
```
If you have already installed `http-server`, you can start the server directly:

```cli
http-server -p PORT
``` 
The port you use for the web server also has to match the port specified in the manifest file (`.trex`) for the server.

```html
<source-location>
      <url>http://localhost:PORT/samples/parameters/parameters.html</url>
</source-location>

```

---

### Use the extensions in the samples folder

After you start the web server to host the sample extensions, you can try the extensions in Tableau.

1. Start Tableau and open a workbook that has a dashboard, or open a workbook and create a new dashboard.
2. In the dashboard, under **Objects**, select **Extension** and drag it on to the dashboard.  
3. In the **Choose an Extension** dialog box, click **My Extensions**. 
4. Browse to the directory where the samples are located. For example, if you downloaded or cloned the GitHub repository, go to `\extensions-api\Samples`.
5. Select one of the folders for the samples and open the `.trex` file (for example, `DataSources.trex`). <br/>
Every Tableau extension has a manifest file (`.trex`) that describes the extension and identifies the location of the web application.

The extension should appear in the dashboard.  Play around with the extension. Examine the HTML and JavaScript source files to see how things work.  

---

## Use the TypeScript samples

The TypeScript samples show how you can write your source code in TypeScript and then use the Extensions API type definitions to compile (or transpile) the code into JavaScript. The samples use Node.js and webpack to build the extensions. These instructions assume that you have cloned or downloaded the Extensions API GitHub repository.

1. Go to the `extensions-api` folder.
1. Install the web server components:

   ```cli
   npm install
   ```

1. Build the TypeScript samples:

   ```cli
      npm run build
   ```

   Run lint with the semistandard package.

   ```cli
      npm run lint
   ```

1. Compile and start the HTTP server for the extensions. This command also watches the source file directories and automatically builds the samples when you make changes.

```cli
npm run dev
```

1. Try the samples.
  - Start Tableau and open a workbook that has a dashboard, or open a workbook and create a new dashboard.
  - In the dashboard, under **Objects**, select **Extension** and drag it on to the dashboard.  
  - In the **Choose an Extension** dialog box, click **My Extensions**.
  - Browse to the directory where the samples are located. For example, if you downloaded or cloned the GitHub repository, go to `\extensions-api\Samples-Typescript`. The folder contains the TypeScript versions of the Datasources, Filtering, and Parameters samples.
  - If you want to experiment with your own TypeScript code for extensions, you can use the same infrastructure that the TypeScript samples use. Create a folder in the **Samples-Typescript** directory and then add your extension source files. Add an entry to the `webpack.config.js` file for your extension TypeScript file. Update the path to your extension in the `.trex` file. Build and run your extension using the same commands you use to build the samples. For more information, see [Use TypeScript with the Extensions API](../core/trex_typescript).

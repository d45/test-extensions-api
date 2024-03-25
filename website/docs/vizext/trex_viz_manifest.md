---
title: Tableau Viz Extension Manifest File
layout: docs
---

The viz extension manifest file (`.trex`) contains metadata for the extension and is used for registration. The manifest file for viz extensions is similar to the file used for dashboard extensions in structure, but instead of the `dashboard-extension` element, you define a `worksheet-extension` element. The manifest files are not interchangeable.

For details about a manifest or its fields, see the [Sample Manifest File](#sample-viz-manifest-file) and [Elements of the Viz Manifest File](#elements-of-the-viz-manifest-file).  

**In this section**



## Manifest Versioning

The versioning of the manifest is designed to be semantically simple and support compatibility. The version follows the [Major].[Minor] format. Minor upgrades are backwards compatible while major upgrades involve breaking changes.

## Error Reporting

At start up, Tableau checks the manifest file. If any errors are found while parsing the file, Tableau writes these errors to the `log.txt` file in the `My Tableau Repository/Logs` folder. This is the same location that Tableau Desktop uses to report other errors and activity.

## Sample Viz Manifest File

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest manifest-version="0.1" xmlns="http://www.tableau.com/xml/extension_manifest">
  <worksheet-extension id="com.example.extensions.name" extension-version="0.1.0">
    <default-locale>en_US</default-locale>
    <name resource-id="name"/>
    <description>Viz extension description</description>
    <author name="USERNAME" email="USER@example.com" organization="MyCo" website="https://www.example.com"/>
    <min-api-version>1.1</min-api-version>
    <source-location>
      <url>SCHEME:SERVER:PORT/PATH</url>
    </source-location>
    <icon>Base64-Encoded ICON</icon>
    <permissions>
      <permission>full data</permission>
    </permissions>
    <encoding id="Encoding-id">
      <display-name>Encoding display name</display-name>
        <data-spec>
          <data-type>Encoding-type</data-type>
        </data-spec>
        <role-spec>
          <role-type>Encoding-role</role-type>
        </role-spec>
        <fields max-count="n"/>
    </encoding>
  </worksheet-extension>
  <resources>
    <resource id="name">
      <text locale="en_US">name in English</text>
      <text locale="fr_BE">name in French</text>
      <text locale="de_DE">name in German</text>
    </resource>
  </resources>
</manifest>

``````


## Elements of the Viz Manifest File

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Name of element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>manifest</code></td>
<td>The root element that contains the manifest options.</td>
</tr>
<tr class="even">
<td><code>manifest-version</code></td>
<td>The version of the manifest. Leave this as version 0.1. </td>
</tr>
<tr class="odd">
<td><code>worksheet-extension</code></td>
<td>The root element that contains the options for the viz extension. The <code>worksheet-extension</code> includes the <code>id</code> attribute, which follows the reverse domain name pattern (<code>com.example.extension</code>), and <code>extension-version</code> number attribute. These attributes are required.</td>
</tr>
<tr class="even">
<td><code>extension-version</code></td>
<td>The version of the your extension. For example, <code>extension-version="0.1.0"</code></td>
</tr>
<tr class="odd">
<td><code>default-locale</code></td>
<td>Specifies the default locale to use for localized text. Here both the locale format (en_US) and language code (en) are accepted. The default locale specified here is converted to one of the supported languages in the Tableau UI. If the language is unsupported or invalid, English is set as default. </td>
</tr>
<tr class="even">
<td><code>name</code></td>
<td>The name of the extension as it appears on the Marks card under <b>Viz Extensions</b>. To provide localized text, specify the name of the resource-id and provide the text strings in the resources element of the manifest (see the manifest example). You can provide localized strings for name and description.</td>
</tr>
<tr class="odd">
<td><code>description</code></td>
<td>A short description of the extension.</td>
</tr>
<tr class="even">
<td><code>author</code></td>
<td>Specifies metadata about the author of the extension, including <code>name</code>, <code>email</code> address, <code>organization</code>, and <code>website</code>. The <code>name</code> and <code>website</code> attributes are required. The <code>website</code> URL must use HTTPS. The <code>website</code> . </td>
</tr>
<tr class="odd">
<td><code>source-location</code></td>
<td>Contains the <code>url</code> of the server that hosts the web page you create that interacts with Tableau.</td>
</tr>
<tr class="even">
<td><code>url</code></td>
<td>Specifies the scheme (HTTPS, HTTTP), the name of the server, the port (optional) and the path to extension (optional). The <code>url</code> must use HTTPS. For example: <code>https://example.com/extension</code>. 
The exception is for <code>localhost</code>. In this case, HTTP is allowed. For example: <code>http://localhost:8080</code>.</td>
</tr>
<tr class="even">
<td><code>icon</code></td>
<td>Not currently used. The icon is a 70x70 pixel PNG file that is Base64 encoded. If you need an encoder, see <a href="https://www.base64-image.de/" class="uri">https://www.base64-image.de/</a></td>
</tr>
<tr class="odd">
<td><code>permissions</code></td>
<td>Declares the types of permissions that this extension requires. The only option is <code>full data</code>. If your extension can access the underlying data or information about the data sources, you must declare full data permission in the manifest. Full data permissions are required if you use any one of the following APIs: <code>Worksheet.getUnderlyingDataAsync()</code>, <code>Worksheet.getUnderlyingTablesAsync()</code>, <code>Worksheet.getUnderlyingTableDataAsync()</code>, <code>Worksheet.getUnderlyingTableDataReaderAsync()</code>, <code>Datasource.getLogicalTables()</code>, <code>Datasource.getLogicalTableData()</code>, <code>Datasource.getUnderlyingDataAsync()</code>, <code>Datasource.getActiveTablesAsync()</code>, <code>Datasource.getConnectionSummariesAsync()</code>. If your extension does not use one of these APIs, you do not need include permissions element. For more information, see <a href="./trex_data_access.html">Accessing Underlying Data</a>.</td>
</tr>
<tr class="even">
<td><code>encoding</code></td>
<td>Adds tiles to the Marks card for encoding. This is an optional element. By default, the Detail and Tooltip tiles appear on the Marks card. You can use the encoding element to add additional tiles for the fields you want to encode. See the <a href="#add-encoding-in-the-viz-manifest">Encoding</a> section for more information.</td>
</tr>
<tr class="odd">
<td><code>resources</code></td>
<td>Specifies the resources that can be localized.</td>
</tr>
<tr class="even">
<td><code>min-api-version</code></td>
<td>Specifies the minimum API version required to run the extension. </td>
</tr>
</tbody>
</table>

**Constraints** 

- String-based fields: 1000 characters
- URI-based fields: 2084 characters
- Icon field: size of images are restricted to 70x70

----

## Add encoding in the viz manifest

By default, the viz extension has access to the Detail and Tooltip tiles on the Marks card. You can specify additional encoding tiles for the fields you use in your viz extension by adding `<encoding>` elements. Adding encoding elements is optional.

To add custom encoding, you provide definitions for the encoding in the manifest file. For example, the following XML code defines three encoding tiles: an X and Y encoding for continuous numeric measures, and a text encoding for string values. The value of attribute named `id` inside the `<encoding>` element can be used to map to a variable in your JavaScript code. That code then generates the visualization based upon your data.

```xml

<encoding id="x">
  <display-name>X</display-name>
  <data-spec>
    <data-type>numeric</data-type>
  </data-spec>
  <role-spec>
    <role-type>continuous-measure</role-type>
  </role-spec>
  <fields max-count="1"/>
</encoding>
<encoding id="y">
  <display-name>Y</display-name>
  <data-spec>
    <data-type>numeric</data-type>
  </data-spec>
  <role-spec>
    <role-type>continuous-measure</role-type>
  </role-spec>
  <fields max-count="1"/>
</encoding>
<encoding id="text">
    <display-name>Text</display-name>
    <data-spec>
      <data-type>string</data-type>
    </data-spec>
</encoding>

``````

These encodings are rendered on the Marks card as tiles A, B, and C.

![](../assets/viz_ext_marks.png)

Note: The Tooltip and Details tiles encoding are always part of a viz extension.
For the developer preview, you aren't able to customize the encoding box icon. By default, the system
will assign an icon with either the Ⓐ, Ⓑ, Ⓒ, or Ⓓ icon.

The following table lists the elements and values you can use to add encoding tiles to the Marks card.

<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr class="header">
<th>Name of element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>encoding</code></td>
<td>(Optional) The element that contains the encoding definition. By default, all viz extensions will have the Tooltip and Details encoding tiles. If you want to add your own encoding tile, add this &lt;encoding&gt; element to the manifest file and specify a unique <code>id</code> for the encoding. The <code>id</code> corresponds to a variable in your code that is used to generate the visualization from the data. For example, the encoding with the <code>id</code> of <code>'x'</code> could be used to map fields to the x-axis of the visualization. You can add up to four custom encodings. </td>
</tr>
<tr class="even">
<td><code>display-name</code></td>
<td>(Required) The text string to display on the encoding tile on the Marks card. You can localize this text string by adding an optional <code>resource-id</code> for the encoding. For example, <code>&lt;display-name resource-id="encoding1"&gt;Encoding Name&lt;display-name&gt;</code>. You provide localized strings this <code>resource-id</code> in the resources section of the manifest file.</td>
</tr>
<tr class="odd">
<td><code>data-spec</code></td>
<td>(Optional) Includes the list of data types supported by this encoding. If a &lt;data-spec&gt; element is included, only fields of the specified data types are accepted for this encoding. If the <code>data-spec</code> attribute is omitted, all supported data types will be accepted. The supported data types are defined in this table.</td>
</tr>
<tr class="even">
<td><code>data-type</code></td>
<td>There are four possible data types. <br/><code>numeric</code>, which supports integer and decimal numeric fields. <br/><code>temporal</code>, which supports the three temporal related fields, date, time, and date/time. <br/> <code>string</code>, any text string field. <br/> <code>boolean</code>, which supports a boolean (true/false) field. <br/>Geographic and cluster group data types are not supported. For more information, see <a href="https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles_datatypes.htm">Data Types</a> in Tableau.</td>
</tr>
<tr class="odd">
<td><code>role-spec</code></td>
<td>(Optional) Includes the list of role types supported by this encoding. Role types correspond to the dimensions and measures in Tableau (indicated by the blue and green pills you place on the visualization). If omitted, all four possible values are supported. For more information, see <a href="https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm">Dimensions and Measures, Blue and Green</a>. </td>
</tr>
<tr class="even">
<td><code>role-type</code></td>
<td>(Required) Specifies whether the encoding is for a continuous or discrete dimension or measure. The options are:  <code>continuous-measure</code>, <code>discrete-dimension</code>, <code>continuous-dimension</code>, <code>discrete-measure</code>.</td>
</tr> 
<tr class="odd">
<td><code>fields</code></td>
<td>(Optional) The maximum number of fields that can use this encoding. Use the `max-count` attribute to specify the maximum number of fields. If not specified, there is no limit on the number of fields that can use this encoding.</td>
</tr>
</tbody>
</table>

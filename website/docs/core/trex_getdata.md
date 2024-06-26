---
title: Getting Data from the Workbook
description: How to access data in the workbook
---

The Tableau Extensions API provides methods that you can use to access the data in a workbook. The data you can access includes the summary or aggregated data, and also the underlying data (or full data). If your extension needs to access the full data, there are security implications and your extension needs to declare its intent, so that users of your extension can choose to allow or deny the extension access. See  [Accessing Underlying Data](../security/trex_data_access) for more information.

::::note

Tableau 2020.2 introduced a new data model. To support that model, the Extensions API provides new methods and data structures starting with version 1.4 of the Extensions API library. In the new data model, a data source could have multiple logical tables, and logical tables can contain one or more physical tables. If you have an existing extension that uses one of the deprecated methods to get underlying data, the method call could fail if the data source contains more than one logical table. You should update your extensions to use these new methods. The new methods are backward compatible with previous versions of Tableau.

For information about the data model, see [The Tableau Data Model](https://help.tableau.com/v2020.2/pro/desktop/en-us/datasource_datamodel.html).

::::

---

## Get data from a worksheet

The Extensions API provides several methods for accessing data from a dashboard. The method you use depends in part upon how you want to use the data, and on the version of Tableau and the Extensions API library you are using. When you have the worksheet object, you can get the summary data (aggregated data) or the full data (underlying data) directly from the worksheet, using these methods:  

| Method  | Tableau Version | Extensions API Library | Status |
| :------ | :---------------| :--------------------- | :------|
| `Worksheet.getSummaryDataReaderAsync()` | Tableau 2022.4 and later |  version 1.10 and later | Current |
| `Worksheet.getSummaryDataAsync()` | Tableau 2018.2 and later | version 1.1 and later | Deprecated |
| `Worksheet.getUnderlyingDataAsync()` | Tableau 2018.2 to 2020.1 | version 1.1 to 1.3 | Deprecated |
| `Worksheet.getUnderlyingTablesAsync()` | Tableau 2018.2 and later | version 1.4 and later | Current |
| `Worksheet.getUnderlyingTableDataAsync()` | Tableau 2018.2 and later | version 1.4 and later | Current |
| `Worksheet.getUnderlyingTableDataReaderAsync()` | Tableau 2022.4 and later |  version 1.10 and later | Current |

The data is returned in a `DataTable` object. The `getSummaryDataReaderAsync` and `getUnderlyingTableDataReaderAsync` methods return a `DataTableReader` object, which you can use to return the pages of `DataTable` objects.  The `DataTable` object contains the columns and data values, and information about the data, whether it is underlying or summary data, and in the case of underlying data, whether there is more data than can be returned.

Starting in Tableau 2020.2, with the introduction of the new data model and logical tables, you need to use the `Worksheet.getUnderlyingTablesAsync` method to first return the array of `LogicalTable` objects. The `LogicalTable` objects returned are determined by the measures in the worksheet. The `LogicalTable` objects correspond to the tables shown in the default view on the **Data Source** page in Tableau. These tables make up the *logical layer*. You can retrieve the underlying or logical data from each `LogicalTable` in the worksheet or data source.

| Object/Property| Description |
| :------------  | :---------- |
| `LogicalTable` |  Object that represents a logical table in a data source, or logical table used in a worksheet |
| `LogicalTable.caption`  | The name of the logical table as it appears in Tableau. |
| `LogicalTable.id`       | The identifier used to specify the logical table. Use this value to call `getUnderlyingTableDataAsync` or `getUnderlyingTableDataReaderAsync`. |

You can also get the data from the selected marks in the worksheet, or the marks that are currently highlighted in the worksheet. The following two functions return a `MarksCollection`, which is an array of `DataTable` objects.

`Worksheet.getSelectedMarksAsync()`

`Worksheet.getHighlightedMarksAsync()`

## Get the worksheet object

The first step for accessing data of any kind is to get the worksheet object (or objects) that you want.

```javascript

    //  After initialization, ask Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Find a specific worksheet
    var worksheet = worksheets.find(function (sheet) {
      return sheet.name === "Name of Worksheet I want";
    });

    // Or iterate through the array of worksheets
    worksheets.forEach(function (worksheet) {
      //  process each worksheet...
    });

```

After you have a worksheet object, you can call one of the methods to access the data for that worksheet. For summary data, or the data from the selected or highlighted marks, the steps are straight forward. If you want access the underlying data (or full data), there are additional steps and considerations. See [Accessing Underlying Data](../security/trex_data_access).

## Get summary data from a worksheet

Starting with Tableau 2022.4 and the Dashboard Extensions API library v1.10, you should use the `getSummaryDataReaderAsync()` method to get data from a worksheet. This method returns a `DataTableReader` object that you can use to access the data.

If your summary data is less than 4,000,000 rows (400 pages), you can use the `DataTableReader.getAllPagesAsync()` method to retrieve a single `DataTable` from the `DataTableReader`. The following example shows how to do this.

```javascript

// Use `await` only inside an `async` method

  const dataTableReader = await worksheet.getSummaryDataReaderAsync();
  const dataTable = await dataTableReader.getAllPagesAsync();
  await dataTableReader.releaseAsync();
  // ... process data table ...

```

If your summary data contains more than 4,000,000 rows (or 400 pages), use the summary `DataTableReader` to iterate through the pages of data for all rows in the worksheet. In this case, you process each `DataTable` sequentially. You can control the page size, using the optional `pageRowCount` parameter when you call `getSummaryDataReaderAsync`. The default page size is 10,000 rows. Using the `DataTableReader` you can create a loop to retrieve each page of summary data, using `DataTableReader.pageCount` or `DataTableReader.totalRowCount` property to determine the number of pages to process. Use the `getPageAsync` method to get the `DataTable` from each page. After you have retrieved all pages of the summary data, call the `releaseAsync` method to free up memory from the `DataTableReader`.

```javascript

// Use `await` only inside an `async` method

const dataTableReader = await worksheet.getSummaryDataReaderAsync();
try {
  for (let currentPage = 0; currentPage < dataTableReader.pageCount; currentPage++) {
      const dataTablePage = await dataTableReader.getPageAsync(currentPage);
      // ... process current page ....
  }
} catch (e) {
  console.error(e);
} finally {
  // free up resources
  await dataTableReader.releaseAsync();
}

```

#### Deprecated method

Prior to Tableau 2022.4 and the Dashboard Extensions API library v1.10, you would use the `getSummaryDataAsync` method. This method could fail if there is a large amount of summary data. Modify your code to use the `getSummaryDataReaderAsync` method instead.

```javascript
 // get the summary data for the sheet
 worksheet.getSummaryDataAsync().then(function (sumdata) {
  const worksheetData = sumdata;
  // The getSummaryDataAsync() method returns a DataTable
  // Map the DataTable (worksheetData) into a format for display, etc.
 });

```

## Get full data from a worksheet

If your extension uses one of the functions that can access full data, you need to add an element to the manifest file (`.trex`) that declares that the extension requires `full data` permission. If the manifest file does not have this element, the extension can run, but the method to access full data will fail. See [Add permissions to access full data to manifest file](../security/trex_data_access#add-permissions-to-access-full-data-to-manifest-file).

Note whoever uses your extension must have the appropriate download permissions (Download Full Data) so that extension can run.

Starting in Tableau 2020.2, and using version 1.4 of the Extensions API v1.4 library, the methods for accessing the underlying data changed. You can use these methods in all versions of Tableau (starting with 2018.2) if you use the v1.4 library or later.

### Get full data using the v1.4 library (and later)

Starting in Tableau 2020.2 and later, where the underlying data could include multiple logical tables, you first need to identify the logical table (or tables) you want data from. In previous versions of Tableau, logical tables did not exist. When you use the `getUnderlyingTablesAsync` in Tableau 2020.1 and earlier, the method returns a single table. You can use this single table identifier to call `getUnderlyingTableDataAsync` and `getUnderlyingTableDataReaderAsync`.

#### 1. Get the logical table(s) using getUnderlyingTablesAsync()

The first step is to use the `Worksheet.getUnderlyingTablesAsync()` method to return the array of `LogicalTable` objects. The `LogicalTable` objects returned are determined by the measures in the worksheet. If a worksheet's data source contains multiple logical tables and the worksheet only uses measures from one logical table, the method will return one logical table.

To get the underlying data for each logical table, you use the `LogicalTable.id` property of the table to call `Worksheet.getUnderlyingTableDataAsync()`. Note that when you use the `getUnderlyingTablesAsync()` in Tableau 2020.1 and earlier, the method will only return a single table, and that table uses  `single-table-id-sentinel` as the `LogicalTable.id`.

```javascript

// Call to get the underlying logical tables used by the worksheet
worksheet.getUnderlyingTablesAsync().then(logicalTables => {
  // Get the first logical table's id
  // In Tableau <= 2020.1, the first table is the only table returned.
  const logicalTableId = logicalTables[0].id;

  // Use the logicalTableId to then get worksheet's underlying data
  // by calling worksheet.getUnderlyingTableDataAsync(logicalTableId) or
  // worksheet.getUnderlyingTableDataReaderAsync(logicalTableId)

});


```

#### 2a. Get data from the logical table(s) (less than 10,000 rows)

If the data doesn't contain more than 10,000 rows, you can use the `getUnderlyingTableDataAsync` method to get data from a worksheet.

Using the `logicalTable.id`, you call the `getUnderlyingTableDataAsync` method to return a `DataTable` containing the underlying data (up to 10,000 rows) for the logical table. Repeat this step for each logical table.

The following example returns data for the first logical table that is used by a worksheet called *"Sale Map"*.  

```javascript

 var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Sale Map");
 worksheet.getUnderlyingTablesAsync().then(logicalTables => {
     worksheet.getUnderlyingTableDataAsync(logicalTables[0].id).then(dataTable => {
       // process the dataTable...
     });
 });

```

You can specify the number of rows of data to return by setting `GetUnderlyingDataOptions.maxRows` property. If unspecified (`maxRows == '0'`), the call to `getUnderlyingTableDataAsync` requests all rows in the logical table. Note that the maximum number of rows returned from the `getUnderlyingTableDataAsync` method is limited to 10,000 rows. You can use the `DataTable` property, `isTotalRowCountLimited`, to test whether there is more data. A value of true indicates that the calling function requested more rows than the limit (10,000) and the underlying data source contains more rows than can be returned. If the data contains more than 10,000 rows, use `getUnderlyingTableDataReaderAsync` method instead.

#### 2b. Get data from the logical table(s) (more than 10,000 rows)

Starting with Tableau 2022.4 and the Dashboard Extensions API library v1.10, if the data contains more than 10,000 rows, use the `getUnderlyingTableDataReaderAsync` method to get data from a worksheet. In this case, you create a `DataTableReader` to iterate through the pages of data. You process each `DataTable` sequentially. You can control the page size, using the optional `pageRowCount` parameter when you call `getUnderlyingTableDataReaderAsync`. The default page size is 10,000 rows.

The basic steps are as follows:

1. Using the `logicalTable.id`, call the `getUnderlyingTableDataReaderAsync` method to create the `DataTableReader`.

1. Create a loop to retrieve each page of underlying data, using `DataTableReader.pageCount` or `DataTableReader.totalRowCount` property of the `DataTableReader` to determine the number of pages to process.

1. Use the `getPageAsync` method to get the DataTable from each page.

1. After you have retrieved all pages of the summary data, call the `releaseAsync()` method to free up memory from the `DataTableReader`.

```javascript

// assumes this code is in an async method

const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Sale Map");
// Call to get the underlying logical tables used by the worksheet
const underlyingTablesData = await worksheet.getUnderlyingTablesAsync();
const logicalTableId = underlyingTablesData[0].id;
// Use the above logicalTableId to get the underlying data reader on the specified worksheet
const dataTableReader = await worksheet.getUnderlyingTableDataReaderAsync(logicalTableId);
try {
  // loop through and process the pages
  for (let pageNumber = 0; pageNumber < dataTableReader.pageCount; pageNumber++) {
    let currentPageDataTable = await dataTableReader.getPageAsync(pageNumber);
    // process page ...
    console.log(currentPageDataTable);
  }
} catch(e) {
  console.error(e);
} finally {
  // free up resources
  await pageReader.releaseAsync();
}

```

The `getUnderlyingTableDataReaderAsync` method attempts to prepare all the rows of the table to be read as pages. There is a limit to the number of rows that can be prepared to conserve computing resources. The default limit is 1 million rows of data. You can change this default row limit with the Tableau Server, Tableau Cloud, or Tableau Desktop option: `ExtensionsAndEmbeddingReaderRowLimit`. For Tableau Desktop, you can set this with a command line option **`-DExtensionsAndEmbeddingReaderRowLimit=`***value*.

If the underlying table has many columns, `getUnderlyingTableDataReaderAsync` can be sped up by only requesting native data values (`IncludeDataValuesOption.OnlyNativeValues`) in the `GetUnderlyingDataOptions`.

---

### Deprecated: Get full data (library v1.3 and earlier)

If you were using 1.3 version of the Extensions API library (or earlier), you had to use the `getUnderlyingDataAsync` method to get the underlying data from a worksheet in Tableau 2020.1 and earlier. This method has been deprecated, but it shown here for completeness.

If you want your extension to work in all versions of Tableau, you should use the latest library (version 1.4 or later) and the `getUnderlyingTablesAsync` and `getUnderlyingTableDataAsync` methods.

```javascript

// the following example uses the Superstore workbook and gets the underlying data 
// for a specific worksheet.
// The example writes the values for a single column (states names) to the console.
tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Sale Map").getUnderlyingDataAsync().then(dataTable => {
  let field = dataTable.columns.find(column => column.fieldName === "State");
  let list = [];
  for (let row of dataTable.data) {
    list.push(row[field.index].value);
  }
  let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
  console.log(values)
});

```

---

## Get data from a data source

You can also get the underlying data from the data sources for the worksheet. To do that, you must acquire the data sources for the worksheet with a call to the `getDataSourcesAsync()` method, which returns an array of the primary and all the secondary data sources of a worksheet. Once you have the data source object, you can access the underlying data and access information about the data source, such as the names of tables and fields and information about the connection.

Just like worksheet methods that access full data, the following methods for the data source also require that your extension specifies `full data` permissions in the `trex` file. See [Add permissions to access full data to manifest file](../security/trex_data_access#add-permissions-to-access-full-data-to-manifest-file).


| Method | Tableau Version | Extensions API Library | Status |
|:------ | :---------------| :--------------------- |:-------|
| `Datasource.getConnectionSummariesAsync()`| Tableau 2018.2 and later | version 1.1 and later | Current |
| `Datasource.getDataSourcesAsync()` | Tableau 2018.2 and later | version 1.1 and later | Current |
| `Datasource.getActiveTablesAsync()` | Tableau 2018.2 to 2020.1 | version 1.1 to 1.3 |  Deprecated |
| `Datasource.getUnderlyingDataAsync()` | Tableau 2018.2 to 2020.1 | version 1.1 to 1.3 | Deprecated |
| `Datasource.getLogicalTablesAsync()` | Tableau 2018.2 and later | version 1.4 and later | Current |
| `Datasource.getLogicalTableDataAsync()` | Tableau 2018.2 and later | version 1.4 and later | Current |
| `Datasource.getLogicalTableDataReaderAsync()` | Tableau 2022.4 and later | version 1.10 and later | Current |


## Get the data sources from a worksheet

To get the data sources a worksheet uses, you call the `getDataSourcesAsync()` method on the worksheet object. The following code snippet shows how you might select a specific data source of a worksheet.

```javascript

tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Sale Map").getDataSourcesAsync().then(datasources => {
  let dataSource = datasources.find(datasource => datasource.name === "Sample - Superstore");
  // return dataSource for further processing
});

```

### Get full data from a worksheet using the v1.4 library (and later)

After you have the data source object, you can query the data source for the underlying data. Starting in Tableau 2020.2 and later, the underlying data could include multiple logical tables. Before accessing the data you need to identify the logical table (or tables) of the data source you want data from. In previous versions of Tableau (2020.1 and earlier), logical tables did not exist. When you use the `Datasource.getLogicalTablesAsync()` in Tableau 2020.1 and earlier, the method returns a single table.

#### 1. Get the logical table(s) using getLogicalTablesAsync()

The first step in getting the underlying data is to call the `Datasource.getLogicalTablesAsync` method to return the array of `LogicalTable` objects.

To get the underlying data for each logical table, use the `LogicalTable.id` property of the table to call `Datasource.getLogicalTableDataAsync()`. Note that when you use the `getLogicalTablesAsync` in Tableau 2020.1 and earlier, the method will only return a single table, and that table uses the `single-table-id-sentinel` as the `LogicalTable.id`.

Example that uses a single table:

```javascript

// Call to get the logical tables used by the worksheet
dataSource.getLogicalTablesAsync().then(logicalTables => {
  // Get the first logical table's id
  // In Tableau <= 2020.1, the first table is the only table returned.
  const logicalTableId = logicalTables[0].id;

  // Use the logicalTableId to then get worksheet's underlying data
  // by calling worksheet.getUnderlyingTableDataAsync(logicalTableId)

});

```

Example that writes the names of all the logical tables in the data source to the console:

```javascript

// Call to get the logical tables used by the worksheet
dataSource.getLogicalTablesAsync().then(logicalTables => {
  // Loop through each table in this data source
  logicalTables.forEach( table => {
    console.log(table.caption);
    });
});

```

#### 2a. Get data from the logical table(s) for less than 10,000 rows

If the data doesn't contain more than 10,000 rows, you can use the `getLogicalTableDataAsync` method to get data from a data source.

After you have identified the logical tables you want, use the `LogicalTable.id` property of the table to call `Datasource.getLogicalTableDataAsync()`. You can then process the data for that logical table.  

The following example returns the column names of the first logical table that is in the data source.  

```javascript

  dataSource.getLogicalTablesAsync().then(logicalTables =>  {
    // get the underlying data from the first logical table
    dataSource.getLogicalTableDataAsync(logicalTables[0].id).then(dataTable => {
      // get the names of the columns in the dataTable
    let list = [];  
    for (let col of dataTable.columns) {
      list.push(col.fieldName);
    }
    console.log(list);
    });
  });

```

#### 2b. Get data from the logical table(s) for more than 10,000 rows

Starting with Tableau 2022.4 and the Dashboard Extensions API library v1.10, if the data contains more than 10,000 rows, use the `getLogicalTableDataReaderAsync` method to get data from a data source. In this case, you create a `DataTableReader` to iterate through the pages of data for all rows in the worksheet. You process each `DataTable` sequentially. You can control the page size, using the optional `pageRowCount` parameter when you call `getLogicalTableDataReaderAsync`. The default page size is 10,000 rows.

The basic steps are as follows:

Using the `logicalTable.id`, call the `getLogicalTableDataReaderAsync` method to create the `DataTableReader`.
Create a loop to retrieve each page of logical data, using `DataTableReader.pageCount` or `DataTableReader.totalRowCount` property of the summary `DataTableReader` to determine the number of pages to process. Use the `getPageAsync()` method to get the `DataTable` from each page. After you have retrieved all pages of the  data, call the `releaseAsync()` method to free up memory from the `DataTableReader`.

```javascript

// assumes this code is in an async method

const pageRowCount = 1000;  // default is 10,000
const dataSources = await worksheet.getDataSourcesAsync();
const dataSource = dataSources.find(datasource => datasource.name === "Sample - Superstore");
const logicalTables = await dataSource.getLogicalTablesAsync()
const dataTableReader = await dataSource.getLogicalTableDataReaderAsync(logicalTables[0].id, pageRowCount);
try {  
  // loop through and process each page 
  for (let pageNumber = 0; pageNumber < dataTableReader.pageCount;  pageNumber++;) {
    let currentPageDataTable = await dataTableReader.getPageAsync(pageNumber);
    // process page ...
    console.log(currentPageDataTable);     
  }
} catch (e) {
  console.error(e);
} finally {
// release resources
  await pageReader.releaseAsync();
}

```

### Deprecated: Get data from a data source using the v1.3 library (and earlier)

If you were using 1.3 version of the Extensions API library (or earlier), you had to use the `getUnderlyingDataAsync` method to get the underlying data from a data source in Tableau 2020.1 and earlier. This method has been deprecated, but it shown here for completeness.

If you want your extension to work in all versions of Tableau, you should use the latest library (version 1.4 or later) and the `Datasource.getLogicalTablesAsync()` and `Datasource.getLogicalTableDataAsync` methods.

```javascript

tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "Sale Map").getDataSourcesAsync().then(datasources => {
  dataSource = datasources.find(datasource => datasource.name === "Sample - Superstore");
  return dataSource.getUnderlyingDataAsync();
}).then(dataTable => {
// process the dataTable...
});

```

---

## Compatibility: methods for accessing underlying data

To support the data model that was introduced in Tableau 2020.2, where a data source can have logical tables, the Tableau Dashboard Extensions API provides new methods for getting data. The new methods are available starting with version 1.4 of the Extensions API library. Starting with version 1.10 of the library, there are new methods that provide pagination using a `DataTableReader`.  The following table shows the compatibility between the methods and the different versions of the Extensions API library and Tableau.

If you have an existing Dashboard Extension that accesses underlying data, and you want your extension to work with Tableau 2020.2 or later, you should upgrade to the latest version of the library supported by your version of Tableau.

| Methods |  API Version | Tableau 2020.1 and earlier  | Tableau 2020.2 (single logical table) | Tableau 2020.2 (multiple logical tables) |
| :-------- | :---------- | :---------- | :--------- | :-------- |
| `Datasource.getUnderlyingDataAsync` `Worksheet.getUnderlyingDataAsync` | v1.3 and earlier | Works as expected | Works, column order will be different | Fails with an exception: Not Supported (2) |
| `Datasource.getUnderlyingDataAsync` `Worksheet.getUnderlyingDataAsync` | v1.4  | Works as expected | Works, column order will be different | Fails with an exception: Not Supported (2) |
| `Datasource.getLogicalTablesAsync` `Datasource.getLogicalTableDataAsync` `Worksheet.getUnderlyingTablesAsync` `Worksheet.getUnderlyingTableDataAsync` | v1.4 and earlier | Works, maps to existing commands  | Works, column order will be different | Works as expected |
| `Datasource.getLogicalTableDataReaderAsync`, `Worksheet.getUnderlyingTableDataReaderAsync`  | v1.10 and later | -- | -- | Works as expected |

---

## When there is more data than can be returned

Some data sources can be very large and could contain thousands and thousands of rows. To minimize the impact of requests for data on Tableau performance, the `getUnderlyingDataAsync()`, `Worksheet.getUnderlyingTableDataAsync()`, and `Datasource.getLogicalTableDataAsync` methods are currently limited to returning 10,000 rows. If the method can't return the full number of rows in your data, the `DataTable` property `isTotalRowCountLimited` is set to TRUE. You can use this property to test whether there is more data than can be returned.

If there are more than 10,000 rows of data, use one of the pagination methods, `Datasource.getLogicalTableDataReaderAsync`, `Worksheet.getUnderlyingTableDataReaderAsync`. These methods return a `DataTableReader` that you can use to page through and retrieve the data.  

Note that the limits do not apply to `getSummaryDataAsync()`. The `getSummaryDataAsync()` method could fail if there is a very large amount of summary data. You should use `getSummaryDataReaderAsync()` instead, the method is available starting with Tableau 2022.4 and the version 1.10 library.

The following table illustrates what happens to calls to `getUnderlyingDataAsync()`, `Worksheet.getUnderlyingTableDataAsync()`, and `Datasource.getLogicalTableDataAsync()` for various sizes of data (shown as **Data Rows**).

* `maxRows` represents the rows requested as one of the `GetUnderlyingDataOptions`. When `maxRows = 0` the method will attempt to return all rows of data.  
* `totalRowCount` represents the number of rows returned in the `DataTable`.
* `isTotalRowCountLimited` is the Boolean that indicates if there is more rows of data than can be returned. 


**Rows of data returned**

| Data Rows | maxRows (input)        | totalRowCount (output) | isTotalRowCountLimited | Comments                                                |
|:----------|:-----------------------|:-----------------------|:-----------------------|---------------------------------------------------------|
| 15,000    | 0                      | 10,000                 | TRUE                   |                                                         |
| 15,000    | any number &gt; 10,000 | 10,000                 | TRUE                   | Any number greater than 10,000 exceeds the return limit |
| 15,000    | 10,000                 | 10,000                 | FALSE                  |                                                         |
| 15,000    | 200                    | 200                    | FALSE                  |                                                         |
| 500       | 0                      | 500                    | FALSE                  |                                                         |
| 500       | any number &gt; 10,000 | 500                    | FALSE                  |                                                         |
| 500       | 200                    | 200                    | FALSE                  |                                                         |
| 10,000    | 0                      | 10,000                 | FALSE                  |                                                         |
| 10,000    | any number &gt; 10,000 | 10,000                 | FALSE                  |                                                         |
| 10,000    | 10,000                 | 10,000                 | FALSE                  |                                                         |
| 10,000    | 200                    | 200                    | FALSE                  |                                                         |

---

## Handle full data access and permission errors

When an extension needs full data access and the user does not have full data permission on the workbook, Tableau currently allows the extension to run, but Tableau will call the promise failure function if the extension calls `getUnderlyingData()`, `Worksheet.getUnderlyingTableDataAsync()`, and `Datasource.getLogicalTableDataAsync()`. This is shown in the following example.

```javascript

Worksheet.getUnderlyingTableDataAsync(logicalTables[0].id).then(function(success) {
    // called on success
}, function (err) {
    // called on any error, such as when the extension 
    // doesn’t have full data permission
});

```

An error is also printed to the console. If you use any of these methods to get the full data, be sure to add error handling for the promise in case of failure.

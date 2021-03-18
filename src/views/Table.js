import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
    Card,
    CardContent,
    CardHeader
  } from '@material-ui/core';
  import Spinner from "../views/Spinner/Spinner";

const columns = [
  { field: 'id', headerName: 'SL.No', width: 100 },
  { field: 'country_name', headerName: 'Country Name', width: 200 },
  { field: 'active_cases', headerName: 'Active Cases', width: 150 },
  { field: 'deaths', headerName: 'Deaths', width: 150 },
  { field: 'new_cases', headerName: 'New Cases', width: 150 },
  { field: 'total_recovered', headerName: 'Recovered', width: 150 },
];

const DataTable = (props) => {
  return (
    <Card>
    <CardHeader titleTypographyProps={{variant:'h4' }} title="World Wide Data Table"/>
    <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          {props.List != undefined ? <DataGrid rows={props.List} columns={columns} pageSize={20}/> : <Spinner/> }
        </div>
        </CardContent>
    </Card>
    
  );
}

export default DataTable;

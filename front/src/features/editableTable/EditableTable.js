import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ImportExport from '@mui/icons-material/ImportExport';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePuzzlesRetrieveQuery, usePuzzlesCreateMutation, usePuzzlesUpdateMutation, usePuzzlesDestroyMutation } from '../../store/puzzleApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// test set
//const rows = [
//  { id: 1, question: 'Snow', answer: 'Jon'},
//  { id: 2, question: 'Lannister', answer: 'Cersei'} }


export default function EditableTable() {

const [puzzlesCreate] = usePuzzlesCreateMutation();
const [puzzlesUpdate] = usePuzzlesUpdateMutation();
const [puzzlesDestroy] = usePuzzlesDestroyMutation();

const [error, setError] = useState("");

const [file, setFile] = useState("");

const [datarows, setDatarows] = useState([])

const [selectionModel, setSelectionModel] = React.useState([]);

const tkn = useAppSelector(state=>state.auth.token);
let {data, refetch}  = usePuzzlesRetrieveQuery(tkn ? undefined : skipToken, {refetchOnMountOrArgChange:true});
useEffect(()=>{ 
if (data) 
{ setDatarows(data); } 
},[data]);

const [selectedRows, setSelectedRows]= React.useState([]);
console.log(data);

const columns = [
  { field: 'id', headerName: 'id', width: 90 },
  {
    field: 'Question',
    headerName: 'Question',
    width: 150,
    editable: true,
  },
  {
    field: 'Answer',
    headerName: 'Answer',
    width: 150,
    editable: true,
  },
  {
    field: "delete",
    width: 75,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => {
      return (
        <IconButton
          onClick={() => {
	    console.log(selectionModel);
            let selectedIDs = new Set(selectedRows);
	    for (const elemId of selectedIDs)
            {
		console.log(elemId);
		puzzlesDestroy({ var:elemId});
	    }
	    let rows = datarows.filter(row => !selectedIDs.has(row.id));
	    setDatarows(rows); 
          }}
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }
];



function processRowUpdate(newRow)
{
	const updatedRow = { ...newRow, isNew: false };
	console.log(updatedRow);
	console.log(newRow.id);
	console.log(updatedRow.Question);
	console.log(updatedRow.Answer);
	puzzlesUpdate({var:updatedRow.id,data:{Question:updatedRow.Question, Answer:updatedRow.Answer}});

    	return updatedRow;
}

function selectCheckbox(element) {
	setSelectedRows(element);
}


const [question, setQuestion] = React.useState("")
const [answer, setAnswer] = React.useState("")

function handleAddNew(){
	puzzlesCreate({data: {Question: question, Answer: answer}});
	setQuestion("");
	setAnswer("");
	refetch();
}

  return (
    <Box sx={{ p:2, height: 400, width: '100%' }}>
       {!!tkn ? ( <div>
	<DataGrid
		pageSize={10}
		autoHeight={true}
		onRowSelectionModelChange={selectCheckbox}
        	rows={datarows}
        	columns={columns}
        	initialState={{
          		pagination: {
            			paginationModel: {
              			pageSize: 10 }}
                }}
        	pageSizeOptions={[10]}
        	checkboxSelection
        	disableRowSelectionOnClick
		processRowUpdate={processRowUpdate}
		slots={{ toolbar:GridToolbar }} />

	<Stack>
		<TextField id="question" value={question} onChange={(e)=>setQuestion(e.target.value)} label="Question" variant="standard" />
		<TextField id="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} label="Answer" variant="standard" />
		<Button onClick={handleAddNew}>Add new</Button>
	</Stack>
	</div>) : (
	<h2>Please login</h2>
	) }
    </Box>
  );
}

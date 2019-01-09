import axios from 'axios';

export const ADDING = 'ADDING';
export const ADDED = 'ADDED';
export const ERROR = 'ERROR';
export const ADDING_NOTE = 'ADDING_NOTE';
export const NOTE_ADDED ='NOTE_ADDED';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const NOTE_UPDATED ='NOTE_UPDATED'
export const DELETING = 'DELETING';
export const DELETED ='DELETED';
export const FETCHED = 'FETCHED';
export const FETCHING = 'FETCHING';
export const SINGLE_FETCHED = 'SINGLE_FETCHED';
export const FETCHING_SINGLE = 'FETCHING_SINGLE';

const url = "https://lambda-notes-backend-kevten.herokuapp.com/notes";
export const fetchNotes = () => {
    const noteData = axios.get(url);
    return function(dispatch) {
        noteData.then( ({data}) => {
            dispatch({type: FETCHED, payload:data});
            console.log(data);
        })
        .catch(err => {dispatch({type:ERROR, payload: err})})
    }
    
};

export const addNote = newNote => {
    const noteData = axios.post(url, newNote); 
    return function(dispatch) {
        dispatch({type: ADDING_NOTE });
        noteData.then(({data})=>{
           dispatch({type: NOTE_ADDED, payload: data});
        })
        .catch(err => {dispatch({type: ERROR, payload: err})})
        
    };
}

export const fetchSingleNote = id => {
    const noteData = axios.get(`${url}/${id}`);
    return function(dispatch){
            dispatch({type: FETCHING_SINGLE})
            noteData.then( ({data}) => {
                dispatch({type: SINGLE_FETCHED, payload:data});
            })
            .catch(err => {dispatch({type:ERROR, payload:err})})
        }
    }

export const updateNote = noteEdit => {
    const noteData = axios.put(`${url}/${noteEdit.id}`, noteEdit);
  return function(dispatch) {
    dispatch({ type: UPDATING_NOTE });
    noteData.then(({data}) => {
        console.log(data);
      dispatch({type: NOTE_UPDATED, payload: data});
    })
      .catch(err => {dispatch({type: ERROR, payload: err})})
  }
}

export const deleteNote = id => {
    const noteData = axios.delete(`${url}/${id}`);
    return function(dispatch){
            dispatch({type: DELETING})
            noteData.then( ({data}) => {
                dispatch({type: DELETED});
            })
            .catch(err => {dispatch({type:ERROR, payload:err})})
        }
    }
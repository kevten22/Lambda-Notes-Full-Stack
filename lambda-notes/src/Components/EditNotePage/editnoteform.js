import React, { Component } from 'react';
import Sidebar from '../Sidebar/sidebar';
import { updateNote, fetchSingleNote } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class EditNoteForm extends Component {
    state = {
      id: -1,
      title: '',
      content: ''
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    updateHandler = () => {
        const id = this.props.match.params.id;
        const {title, content} = this.state;
        this.props.updateNote({id, title, content});

        //Non-API code
        // const nuNotes = this.props.notes.slice();

        // function isindex(note) { 
        //     return note._id == id;
        // }

        // const idFinder = nuNotes.indexOf(nuNotes.find(isindex));
        // nuNotes.splice(idFinder, 1, {id, title, content});
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchSingleNote(id);
        let nuTitle = this.props.note.title;
        let nuContent = this.props.note.content;
        this.setState({title: nuTitle});
        this.setState({content: nuContent});
        this.setState( {id: id});
        console.log(this.state, this.props);
    }

    render () {
        return(
        <div className='create-page-container'>
            <Sidebar />
            <div className="section-container">
                <h1 className="notes-title create"> Edit Note: </h1>
                <form className="create-form">
                    <textarea
                        onChange={this.handleInputChange}
                        className='title-input'
                        value={this.state.title}
                        name='title'
                        >
                        </textarea>
                     <textarea 
                        onChange={this.handleInputChange}
                        className='content-input'
                        value={this.state.content}
                        name='content'
                        >
                        </textarea>
                    <Link to={`/note/${this.state.id}`}>
                    <button className='create-button' type='button' onClick={() => this.updateHandler()}> Update </button>  
                    </Link> 
                </form>
             </div>
         </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        notes: state.notes,
        note: state.note
    };
}

export default connect(mapStateToProps, {updateNote, fetchSingleNote})(EditNoteForm);
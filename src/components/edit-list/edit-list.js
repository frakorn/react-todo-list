import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';
import { toast } from 'react-toastify';
import arrayMove from 'array-move';
import Sortable from '../sortable/sortable';
import { connect } from 'react-redux';

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list: JSON.parse(localStorage.getItem('list')) || this.props.list }
        console.log('props', this.props)
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ list }) => ({
            list: arrayMove(list, oldIndex, newIndex),
        }));
    };

    generateId = (id) => {
        if (this.props.list.find(l => l.id === id))
            this.generateId(id + 1)
        else
            return id;
    }

    addItem = () => {
        const id = this.generateId(this.props.list.length + 1)
        const newObj = {
            "id": id,
            "value": ""
        }
        this.props.addItem(id,newObj)
    }
    removeItem = (id) => {
        this.props.removeItem(id)
    }
    editItem = (id, el) => {
        this.props.editItem(id,el.target.value);
    }
    save = () => {
        try {
            let newList = this.props.list.filter(item => item.value !== '')
            this.setState({
                list: newList
            })
            localStorage.setItem('list', JSON.stringify(newList));
            toast.success("Saved")
        }
        catch (e) {
            toast.error("Error")
        }
    }
    render() {
        return (
            <div className="edit-list">
                <div className="row padding">
                    <div className="col align-right">
                        <button onClick={this.addItem} type="button" className="btn btn-info">Add</button>
                    </div>
                    <div className="col align-left">
                        <button onClick={this.save} type="button" className="btn btn-success">Save</button>
                    </div>
                </div>
                <Sortable removeItem={this.removeItem}
                    editItem={this.editItem}
                    items={this.props.list}
                    onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}

//inject the state into props
const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

//inject the actions into props
const mapDispatchToPros = (dispatch) => {
    return {
        removeItem: (id) => { dispatch({ type: 'DELETE_ITEM', id: id }) },
        editItem: (id,value) => { dispatch({ type: 'EDIT_ITEM', id: id, value: value }) },
        addItem: (id,newObj) => { dispatch({ type: 'ADD_ITEM', id: id, newObj: newObj}) }
    }
}

// add connect function to make TodoList an high order component, in order to take the redux store as input props
export default connect(mapStateToProps, mapDispatchToPros)(EditList)
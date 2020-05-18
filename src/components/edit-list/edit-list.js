import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';
import { toast } from 'react-toastify';
import arrayMove from 'array-move';
import Sortable from '../sortable/sortable';

class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list: JSON.parse(localStorage.getItem('list')) || list };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ list }) => ({
            list: arrayMove(list, oldIndex, newIndex),
        }));
    };

    generateId = (id) => {
        if(this.state.list.find(l => l.id === id))
            this.generateId(id+1)
        else
            return id;
    }

    addItem = () => {
        const id = this.generateId(this.state.list.length + 1)
        const newObj = {
            "id": id,
            "value": ""
        }
        this.setState({ list: [...this.state.list, newObj] })
    }
    removeItem = (id) => {
        this.setState({
            list: this.state.list.filter(item => item.id !== id)
        })
    }
    deleteAll = () => {
        this.setState({
            list: []
        })
    }    
    editItem = (id, el) => {
        let list = this.state.list;
        list.map((l, j) => l.value = l.id === id ? el.target.value : l.value);
        this.setState({ list: list });
    }
    save = () => {
        try {
            let newList = this.state.list.filter(item => item.value!=='')
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
                    <div className="col">
                        <button onClick={this.addItem} type="button" className="btn btn-info">Add</button>
                        <button onClick={this.save} type="button" className="btn btn-success">Save</button>
                        <button onClick={this.deleteAll} type="button" className="btn btn-warning">Delete All</button>
                    </div>               
                </div>
                <Sortable removeItem={this.removeItem}
                    editItem={this.editItem}
                    items={this.state.list}
                    onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}

export default EditList;
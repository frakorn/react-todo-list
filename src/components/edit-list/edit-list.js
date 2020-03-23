import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';
import { toast } from 'react-toastify';
import arrayMove from 'array-move';
import Sortable from '../sortable/sortable';

export default class EditList extends Component {
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
            list: this.state.list.filter(item => item.id != id)
        })
    }
    editItem = (id, el) => {
        debugger
        let list = this.state.list;
        list.map((l, j) => l.value = l.id === id ? el.target.value : l.value);
        this.setState({ list: list });
    }
    save = () => {
        try {
            localStorage.setItem('list', JSON.stringify(this.state.list));
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
                    items={this.state.list}
                    onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}
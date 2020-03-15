import React, { Component } from "react";
import list from "../../storage/list.json"

export default class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list : list}
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
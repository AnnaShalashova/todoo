import React, { Component} from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
    buttons = [
        {name: "All", label: "All"},
        {name: "Active", label: "Active"},
        {name: "Done", label: "Done"}    
    ];

    render() {
        const { filter, filterItem } = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? "btn-info" : "btn-outline-secondary";
            return (
                <button type="button"
                className={`btn ${clazz}`}
                key={ name }
                onClick={() => filterItem(name)}>
                { label }
                </button>
            )
        })
        return (
            <div className="button-group">
                { buttons }
            </div> 
        );
    };
};

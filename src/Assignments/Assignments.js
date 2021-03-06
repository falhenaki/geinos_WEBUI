import React, { Component } from 'react';
import './Assignments.css';
import Select from 'react-select'
import { Button, ControlLabel} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {assign} from "../REST_API/Assignments_API";
import {get_device_groups} from "../REST_API/DeviceGroups_API";
import {get_templates} from "../REST_API/Templates_API";


let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys)

}
const options = {
    afterDeleteRow: onDeleteRow
};

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};


class Assignments extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectTemplateChange = this.handleSelectTemplateChange.bind(this);
        this.assign_template = this.assign_template.bind(this);
        this.state = {
            template: '',
            group: '',
            template_list:[],
            group_list:[]
        }
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleSelectChange = (group) => {
        this.setState({ group });
    };

    handleSelectTemplateChange = (template) => {
        this.setState({ template });
    };

    assign_template(){
        const newAssign={
            temp_name: this.state.template.label,
            group_name: this.state.group.label,
        };
        assign(newAssign);

    }

    componentDidMount() {
        get_templates().then(result=> result.json()).then((items) => {
                for (let i = 0; i <= items.data.length -1; i++) {

                    let newTemplates ={
                        value: [i],
                        label:items.data[i]
                    };
                    this.state.template_list.push(newTemplates);

                }
        }
        );


        get_device_groups().then(result=> result.json()).then((items) => {
                for (let i = 0; i <= items.data.length -1; i++) {

                    let newGroup ={
                        value: [i],
                        label:items.data[i]
                    };
                    this.state.group_list.push(newGroup);

                }
            }
        );
    }


    render() {
        let listOfGroups = this.state.group_list;
        let listOfTemplates = this.state.template_list;
        return (
            <div className="container">
                <div className="Home">
                    <h2>Assignments</h2>
                </div>

                <ControlLabel className="label-template">Template</ControlLabel>
                <Select
                    className="assignment-template-input"
                    controlId="template"
                    value={this.state.template}
                    onChange={this.handleSelectTemplateChange}
                    options= {listOfTemplates}
                />


                <ControlLabel className="label-group">Group</ControlLabel>
                <Select
                    className="assignment-group-input"
                    controlId="group"
                    value={this.state.group}
                    onChange={this.handleSelectChange}
                    options= {listOfGroups}
                />
                <Button className="button-assign-submit" type="submit" onClick={this.assign_template}>Assign</Button>
                <BootstrapTable className="table-assign" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="templateName" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="groupName"  width="150" dataSort>Devices</TableHeaderColumn>
                    <TableHeaderColumn dataField="last-modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Assignments;
import React from "react";
import PropTypes from "prop-types";

import ResponsiveLayout from "src/components/ResponsiveLayout";
import ExpandableContent from "src/components/Expandable/ExpandableContent.jsx";
import ExpandableListItems from "src/components/Expandable/ExpandableListItems.jsx";
import Button from "src/components/Button.jsx";

import { device } from "src/helpers/devices.js";

class ProjectFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            operators: props.operators.map((operator) => ({ ...operator, ...{ selected: operator.selected === true }})),
            tags: props.tags.map((tag) => ({ ...tag, ...{ selected: tag.selected === true }}))
        };
    }

    _onFilterChange() {
        this.props.onFilterChange({
            operators: this.state.operators.filter((operator) => (operator.selected)),
            tags: this.state.tags.filter((tag) => (tag.selected))
        })
    }

    _selectOperatorFilter({ context }) {
        const { operators } = this.state;
        const isSelected = operators.some((operator) => (operator.context === context && operator.selected));
        if (!isSelected) {
            this.setState({
                operators: operators.map((operator) => (
                { ...operator, selected: operator.context === context }
                ))
            }, () => {
                this._onFilterChange();
            });
        }
    }

    _selectTagsFilter({ context }) {
        this.setState({
            tags: this.state.tags.map((tag) => (
                { ...tag, selected: (tag.context === context && !tag.selected) || (tag.context !== context && tag.selected) }
                ))
        }, () => {
            this._onFilterChange();
        });
    }

    _getOperatorFilterButtons() {
        return this.state.operators.map((operator, index) => {
            return <Button key={index} active={operator.selected}  context={operator.context} onClick={this._selectOperatorFilter.bind(this)} text={operator.text}/>;
        });
    }

    _getTagsFilterButtons() {
        return this.state.tags.map((tag, index) => {
            return <Button key={index} active={tag.selected}  context={tag.context} onClick={this._selectTagsFilter.bind(this)} text={tag.text}/>;
        });
    }

    render() {
        return (
            <>
                <ExpandableContent
                    title="Filter Mode"
                    render={({ expanded }) => (
                        <ResponsiveLayout
                            breakpoint={device.size.mobileL}
                            renderDesktop={() => (this._getOperatorFilterButtons())}
                            renderMobile={() => (<ExpandableListItems
                                                    expanded={expanded}
                                                    options={this.state.operators}
                                                    onOptionSelect={this._selectOperatorFilter.bind(this)}/>)}
                        />
                    )}
                />
                <ExpandableContent
                    title="Filter"
                    render={({ expanded }) => (
                        <ResponsiveLayout
                            breakpoint={device.size.mobileL}
                            renderDesktop={() => (this._getTagsFilterButtons())}
                            renderMobile={() => (<ExpandableListItems
                                                    expanded={expanded}
                                                    options={this.state.tags}
                                                    onOptionSelect={this._selectTagsFilter.bind(this)}/>)}
                        />
                    )}
                />
            </>
        );
    }
}

ProjectFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(PropTypes.shape({
        context: PropTypes.any.isRequired,
        selected: PropTypes.bool,
        text: PropTypes.string.isRequired
    })).isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
        context: PropTypes.any.isRequired,
        selected: PropTypes.bool,
        text: PropTypes.string.isRequired
    })).isRequired,
};

export default ProjectFilters;
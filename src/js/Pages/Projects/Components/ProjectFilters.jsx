import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ResponsiveLayout from "src/components/ResponsiveLayout";
import ExpandableList from "src/components/Expandable/ExpandableList.jsx";
import Button from "src/components/Button.jsx";

import { device } from "src/helpers/devices.js";

const FilterBounds = styled.div`
    margin: 0;
    width: 100%;

    @media ${device.mobileL} {
        margin: 0 auto;
        max-width: ${device.size.mobileM}px;
    }

    @media ${device.laptop} {
        width: 100%;
    }
`;

class ProjectFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            operators: props.operators.map((operator) => ({ ...operator, ...{ selected: operator.selected === true }})),
            tags: props.tags.map((tag) => ({ ...tag, ...{ selected: tag.selected === true }}))
        };
    }

    _isSelected(array, context) {
        return array.some((operator) => (operator.context === context && operator.selected));
    }

    _selectOperatorFilter({ context }) {
        if (!this._isSelected(this.state.operators, context)) {
            this.setState({
                operators: this.state.operators.map((operator) => (
                { ...operator, selected: operator.context === context }
                ))
            }, () => {
                this.props.onFilterChange({
                    operators: this.state.operators.filter((operator) => (operator.selected)),
                    tags: this.state.tags.filter((tag) => (tag.selected))
                })
            });
        }
    }

    _selectTagsFilter({ context }) {
        this.setState({
            tags: this.state.tags.map((tag) => (
                { ...tag, selected: (tag.context === context && !tag.selected) || (tag.context !== context && tag.selected) }
                ))
        }, () => {
            this.props.onFilterChange({
                operators: this.state.operators.filter((operator) => (operator.selected)),
                tags: this.state.tags.filter((tag) => (tag.selected))
            });
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
        const { operators, tags } = this.state;
        return (
            <>
                <ResponsiveLayout
                    breakpoint={device.size.tablet}
                    renderDesktop={() => {
                        return (
                            <>
                                <div>
                                    {this._getOperatorFilterButtons()}
                                </div>
                                <div>
                                    {this._getTagsFilterButtons()}
                                </div>
                            </>
                        );
                    }}
                    renderMobile={() => {
                        return (
                            <FilterBounds>
                                <ExpandableList title="Filter Mode" options={operators} onOptionSelect={this._selectOperatorFilter.bind(this)}/>
                                <ExpandableList title="Filter" options={tags} onOptionSelect={this._selectTagsFilter.bind(this)}/>
                            </FilterBounds>
                        );
                    }}
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
import React from "react";
import PropTypes from "prop-types";

import Expandable from "src/components/Expandable/Expandable.jsx";
import ExpandableListItems from "src/components/Expandable/ExpandableListItems.jsx";

class ExpandableList extends React.Component {

    render() {
        const { title, options, collapseOnSelect, onOptionSelect } = this.props;

        return (
            <Expandable
                title={title}
                render={({ expanded }) => (
                    <ExpandableListItems expanded={expanded} options={options} collapseOnSelect={collapseOnSelect} onOptionSelect={onOptionSelect}/>
                )}
            />
        );
    }
}

ExpandableList.defaultProps = {
    collapseOnSelect: false
};

ExpandableList.propTypes = {
    collapseOnSelect: PropTypes.bool.isRequired,
    onOptionSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        context: PropTypes.any,
        selected: PropTypes.bool,
        text: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired
};

export default ExpandableList;
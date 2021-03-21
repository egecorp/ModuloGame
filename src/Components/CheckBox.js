import React from 'react'
import PropTypes from 'prop-types'


export default class CheckBox extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickMarker = this.handleClickMarker.bind(this);
    }

    handleClick()
    {
        if (!this.props.IsSelected)
        {
            this.props.changeItemState(this.props.checkName, true, false);
        }
        else
        {
            this.props.changeItemState(this.props.checkName, true, true);
        }
    }

    handleClickMarker(event)
    {
        event.stopPropagation();
        if (!this.props.IsChecked)
        {
            this.props.changeItemState(this.props.checkName, true, true);
        }
        else
        {
            this.props.changeItemState(this.props.checkName, true, false);
        }
    }

    render()
    {
        return(
            <div 
                className="CheckBox" 
                data-select={this.props.IsSelected ? "1" : "0"}
                data-checked={this.props.IsChecked ? "1" : "0"}
                onClick={this.handleClick}
                >
                <div className="CheckArea" onClick={this.handleClickMarker}><span></span></div>
                <div className="Title">{this.props.title}</div>
            </div>

        );
    }


}

CheckBox.propTypes = {
    Title: PropTypes.string,
    IsSelected: PropTypes.bool,
    IsChecked: PropTypes.bool,
    changeItemState: PropTypes.func
}
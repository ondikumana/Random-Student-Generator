import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const labelStyle = {
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '5px',
    marginRight: '5px'
}


class Name extends React.Component {
    state = {
        hoverActive: false
    }

    onMouseEnterHandler = () => {
        this.setState({ hoverActive: true })
    }

    onMouseLeaveHandler = () => {
        this.setState({ hoverActive: false })
    }

    render() {
        return (
            <Label
                size={'large'}
                style={labelStyle}
                onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}>

                {this.props.name}

                {this.state.hoverActive &&
                    <Icon
                        name='delete'
                        onClick={() => this.props.removeName(name)} /> 
                        // I could use the context api because this function is executed by the grandparent. But this is a small project
                }

            </Label>
        )
    }
}

export default Name
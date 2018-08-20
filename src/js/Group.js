import React from 'react'
import { Segment, Label } from 'semantic-ui-react'
import Name from './Name'
import _ from 'lodash'

let segmentColors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple',
    'pink', 'brown', 'grey', 'black'
]

class Group extends React.Component {

    removeName = (name) => {
        this.props.removeName(name)
    }

    componentDidMount = () => {
        segmentColors = _.shuffle(segmentColors)
    }

    render() {
        return (
            <Segment color={segmentColors[this.props.groupNumber]} compact>
                <Label
                    size={'tiny'} 
                    attached='top left'
                    color={segmentColors[this.props.groupNumber]}>
                    Group {this.props.groupNumber}
                </Label>
                {this.props.group.map((name, i) => {
                    return (
                        <Name
                            key={i}
                            name={name}
                            removeName={() => this.removeName(name)}/>
                    )
                })}
            </Segment>
        )
    }
}

export default Group
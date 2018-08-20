import React from 'react'
import { Select, Container, Form } from 'semantic-ui-react'


const numberOptions = [
    {
        value: 2,
        text: 'Two',
    },
    {
        value: 3,
        text: 'Three',
    },
    {
        value: 4,
        text: 'Four',
    },
    {
        value: 5,
        text: 'Five',
    },
    {
        value: 6,
        text: 'Six',
    },
    {
        value: 7,
        text: 'Seven',
    },
    {
        value: 8,
        text: 'Eight',
    },
    {
        value: 9,
        text: 'Nine',
    },
    {
        value: 10,
        text: 'Ten',
    },
]

const formStyle = {
    display: 'inline-block'
}

const containerStyle = {
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center'
}

class Options extends React.Component {

    // state = {
    //     numberOfGroups: 0,
    //     numberOfStudents: 0
    // }

    onGroupNumberSelectHandler = (value) => {
        this.props.setNumberOfGroups(value)
    }

    onStudentNumberSelectHandler = (value) => {
        this.props.setNumberOfStudents(value)
    }

    render() {
        return (
            <Container 
                style={containerStyle}>
                <Form style={formStyle}>
                    <Form.Group>
                        <Form.Field>
                            <Select
                                placeholder={'Groups'}
                                options={numberOptions}
                                onChange={(e, { value }) => this.onGroupNumberSelectHandler(value)} />
                            <label>Select Number of Groups</label>
                        </Form.Field>
                        <Form.Field>
                            <div>
                                <h3>OR</h3>   
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <Select
                                placeholder={'Students in Group'}
                                options={numberOptions}
                                onChange={(e, { value }) => this.onStudentNumberSelectHandler(value)} />
                            <label>Select Number of Students in a Group</label>
                        </Form.Field>
                    </Form.Group>
                </Form>




            </Container>
        )
    }
}


export default Options
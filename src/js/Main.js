import React from 'react'
import Options from './Options'
import Group from './Group'
import FileInput from './FileInput'
import { Container, Button, Icon, Segment, Message, Header } from 'semantic-ui-react'
import _ from 'lodash'
import * as XLSX from 'xlsx'

// const names = [
//     'Dagny Marquette',
//     'Yanira Joerling',
//     'Chelsea Nielson',
//     'Celina Mossman',
//     'Riley Dematteo',
//     'Graig Lupi',
//     'Jennie Ybanez',
//     'Pinkie Penn',
//     'Emmy Tusing',
//     'Cleveland Irish',
//     'Enedina Scholten',
//     'Diann Manser',
//     'Nohemi Hommel',
//     'Broderick Longstreet',
//     'Hipolito Barroso',
//     'Gina Allsup',
//     'Sophia Bame',
//     'Dominic Mumaw',
//     'Diana Malveaux',
//     'Lesli Scates',
// ]

const containerStyle = {
    paddingTop: '10px',
    paddingBottom: '10px'
}

const segmentGroupContainerStyle = {
    display: 'inline-block',
    textAlign: 'center'
}

class Main extends React.Component {

    state = {
        names: [],
        groups: [],
        studentsOrGroups: 'Groups',
        numberOfGroups: null,
        numberOfStudents: null,
        fileUploadedError: false,
        errorMessage: null,
        errorDetails: null
    }

    setNumberOfGroups = (numberOfGroups) => {
        if (this.state.names.length == 0) {
            // there are no names
            return
        }

        this.setState({
            groups: [],
            StudentsOrGroups: 'Groups',
            numberOfGroups: numberOfGroups
        }, () => this.sliceByGroups())
    }

    setNumberOfStudents = (numberOfStudents) => {
        if (this.state.names.length == 0) {
            // there are no names
            return
        }

        this.setState({
            groups: [],
            StudentsOrGroups: 'Students',
            numberOfStudents: numberOfStudents
        }, () => this.sliceByStudents())
    }

    shuffleStudents = () => {
        if (this.state.names.length == 0) {
            // there are no names
            return
        }

        const names = _.shuffle(this.state.names)
        this.setState({ names: names })
        if (this.state.groups.length > 0) {
            this.setState({ groups: [] },
                () => {
                    if (this.state.studentsOrGroups == 'Groups') {
                        this.sliceByGroups()
                    }
                    else {
                        this.sliceByStudents()
                    }
                }
            )
        }
        else {
            console.log('groups is empty')
        }
    }

    sliceByGroups = () => {
        this.setState({ studentsOrGroups: 'Groups' })
        const { names, studentsOrGroups, numberOfGroups } = this.state

        const namesSize = names.length

        if (!numberOfGroups) {
            //nothing was selected
            console.log('nothing was chosen')
            return
        }

        //split the array into two. One with smaller but equal number of student
        // and a last array with the same number of students in the smaller arrays plus the remainder

        const studentsPerGroup = Math.floor(namesSize / numberOfGroups)
        const remainder = namesSize % numberOfGroups

        const equalGroup = _.slice(names, 0, namesSize - studentsPerGroup - remainder)
        const lastGroup = _.slice(names, namesSize - studentsPerGroup - remainder, namesSize)

        let equalGroups = _.chunk(equalGroup, studentsPerGroup)

        equalGroups.push(lastGroup)

        this.setState({
            groups: equalGroups
        })


    }

    sliceByStudents = () => {
        this.setState({ studentsOrGroups: 'Students' })
        const { names, groups, numberOfStudents } = this.state

        if (!numberOfStudents) {
            //nothing was selected
            console.log('nothing was chosen')
            return
        }

        this.setState({
            groups: _.chunk(names, numberOfStudents)
        })

    }

    onFileSelectedHandler = (event) => {
        this.setState({
            fileUploadedError: false,
            errorMessage: null,
            errorDetails: null,
            names: [],
            groups: []
        })
        const file = event.target.files[0]
        // console.log(file.type)

        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()

        if (fileExtension == 'csv' 
            || fileExtension == 'xlsx'
            || fileExtension == 'xls' ) {
            const reader = new FileReader()

            reader.readAsBinaryString(file)
            reader.onload = (event) => {
                const bstr = event.target.result
                const wb = XLSX.read(bstr, { type: 'binary' })
                /* Get first worksheet */
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
                this.processData(data)
            }
            reader.onerror = (event) => {
                if (evt.target.error.name == "NotReadableError") {
                    console.log("Cannot read file !")
                    this.setState({
                        fileUploadedError: true,
                        errorMessage: 'File Not Readable',
                        errorDetails: 'Unable to read file'
                    })
                }
            }
        }
        else {
            //wrong file type
            this.setState({
                fileUploadedError: true,
                errorMessage: 'Wrong File Type',
                errorDetails: 'Save roster as an excel sheet file'
            })
        }
    }

    processData = (data) => {
        const names = []

        const allTextLines = data.split(/\r\n|\n/)
        const allTextLinesLength = allTextLines.length

        // console.log(allTextLines)

        if (allTextLinesLength <= 1 && allTextLines[0] == '') {
            // file is empty
            this.setState({
                fileUploadedError: true,
                errorMessage: 'Empty',
                errorDetails: 'The selected file does not contain any names.'
            })

            return
        }

        if (allTextLinesLength <= 3) {
            // file does not contain enough names
            this.setState({
                fileUploadedError: true,
                errorMessage: 'Not Enough Names',
                errorDetails: 'A minimum of 3 names is required. You currently have ' + allTextLinesLength +
                    (allTextLinesLength == 1 ? ' name.' : ' names.')
            })

            return
        }

        for (let i = 0; i < allTextLinesLength; i++) {
            if (allTextLines[i].length == 0) {
                // empty row
                continue
            }

            let nameArr = allTextLines[i].split(',')
            let name

            if (nameArr.length == 1) {
                name = nameArr[0]
            }
            if (nameArr.length == 2) {
                name = nameArr[0] + ' ' + nameArr[1]
            }

            if (nameArr.length > 2) {
                //File Should Only Have 2 Columns
                this.setState({
                    fileUploadedError: true,
                    errorMessage: 'Too Many Columns',
                    errorDetails: 'It looks like you have ' + nameArr.length + ' columns. The file should either have one column that has both the first and last names or two columns with the first and last names respectively. Make sure to delete all other columns.'
                })
                return
            }

            names.push(name)
        }
        this.setState({ names: names })
    }

    removeName = (name) => {
        const { names, studentsOrGroups } = this.state

        const newNames = _.pull(names, name)
        this.setState({ names: newNames, groups: [] },
            () => {
                if (studentsOrGroups == 'Groups') {
                    this.sliceByGroups()
                }
                else {
                    this.sliceByStudents()
                }
            })
        // updates names, resets groups, then recreates groups

    }

    render() {
        const { names,
            groups,
            numberOfStudents,
            numberOfGroups,
            fileUploadedError,
            errorMessage,
            errorDetails } = this.state
        return (
            <Container style={containerStyle}>
                <Header
                    size={'huge'}
                    textAlign={'center'}>
                    Group Generator
                </Header>

                <FileInput
                    onFileSelectedHandler={(event) => this.onFileSelectedHandler(event)} />

                {(names.length > 0) &&
                    <Options
                        setNumberOfGroups={(numberOfGroups) => this.setNumberOfGroups(numberOfGroups)}
                        setNumberOfStudents={(numberOfStudents) => this.setNumberOfStudents(numberOfStudents)} />
                }
                {/* only renders if a file has been sucessfully uploaded and is valid */}

                {(fileUploadedError) &&
                    <Container textAlign={'center'}>
                        <Message negative compact floating>
                            <Message.Header>{errorMessage}</Message.Header>
                            {errorDetails && <p>{errorDetails}</p>}
                        </Message>
                    </Container>

                }

                {(groups.length > 0) &&
                    <Container
                        style={segmentGroupContainerStyle}>
                        <Segment.Group
                            raised
                            compact>
                            {groups.map((group, i) => {
                                return (
                                    <Group
                                        key={i}
                                        groupNumber={i + 1}
                                        group={group}
                                        removeName={(name) => this.removeName(name)} />
                                )
                            })}
                        </Segment.Group>
                    </Container>
                }

                {(groups.length > 0 && names.length > 0) &&
                    <Container
                        textAlign={'center'}
                        style={containerStyle}>
                        <Button
                            icon
                            labelPosition='left'
                            onClick={this.shuffleStudents}>
                            <Icon name='shuffle' />
                            Shuffle
                        </Button>
                    </Container>
                }
                {/* only renders if options have been made */}

            </Container>
        )
    }
}

export default Main
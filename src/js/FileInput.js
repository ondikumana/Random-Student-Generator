import React from 'react'
import { Container, Icon, Input } from 'semantic-ui-react'

const fileInputStyle = {
    display: 'none'
}

const containerStyle = {
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center'
}

class FileInput extends React.Component {

    render() {
        return (
            <Container 
                style={containerStyle}>
                <label htmlFor={'file'} className={'ui icon button'}>
                    <Icon name={'upload'} />
                    {'  Open File '}
                </label>
                <Input
                    id={'file'}
                    type={'file'}
                    style={fileInputStyle}
                    onChange={(event) => this.props.onFileSelectedHandler(event)} />
            </Container>
        )
    }
}

export default FileInput
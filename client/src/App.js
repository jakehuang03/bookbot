import React from 'react'
import api from './api'
import FileUpload from './FileUpload';

const App = () => {
    return (
        <div>
            <h1>
                Hello World
                <FileUpload />
            </h1>
        </div>
    )
}

export default App;
import firebase from '@firebase/app'
import * as React from 'react'
import './App.css'

import ArticleContainer from "./ArticleContainer/ArticleContainer"
import ArticleStateContainer from "./ArticleStateContainer"
import logo from './logo.svg'


const articleContainer = new ArticleStateContainer({
    endpoint: "news",
    environment: "test"
})

const stalkerpediaContainer = new ArticleStateContainer({
    endpoint: "stalkerpedia",
    environment: "test"
})

class App extends React.Component {


    public render() {
        const config = {
            apiKey: "AIzaSyBFtDq9H5htpN0PbBWbgyUiPhOhpZRMGJ4",
            authDomain: "larpapp-a45bd.firebaseapp.com",
            databaseURL: "https://larpapp-a45bd.firebaseio.com",
            messagingSenderId: "72895662075",
            projectId: "larpapp-a45bd",
            storageBucket: "larpapp-a45bd.appspot.com"
        }
        firebase.initializeApp(config)

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div>
                    <ArticleContainer articleContainer={articleContainer}/>
                    <ArticleContainer articleContainer={stalkerpediaContainer}/>
                </div>
            </div>
        )
    }
}

export default App
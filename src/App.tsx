import firebase from '@firebase/app'
import * as React from 'react'
import './App.css'

import {Provider, Subscribe} from "unstated"
import ArticleContainer from "./ArticleContainer/ArticleContainer"
import logo from './logo.svg'
import ArticleStateContainer from "./StateContainers/ArticleStateContainer"
import UIStateContainer from "./StateContainers/UIStateContainer"


const environment = "develop"
const articleContainer = new ArticleStateContainer({
    endpoint: "news",
    environment
})

const stalkerpediaContainer = new ArticleStateContainer({
    endpoint: "stalkerpedia",
    environment
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
                    {/* <h1 className="App-title">Welcome to React</h1> */}
                </header>
                <Provider>
                    <Subscribe to={[UIStateContainer]}>
                        {(uiState: UIStateContainer) =>
                            <div className="App-container">
                                <div className="tab-controls flex">
                                    <div
                                        className={"tab-button " + (uiState.state.visibleContainer === "news" ? "active" : "")}
                                        onClick={uiState.setNewsVisible}
                                    >News
                                    </div>
                                    <div
                                        className={"tab-button " + (uiState.state.visibleContainer === "stalkerpedia" ? "active" : "")}
                                        onClick={uiState.setStalkerpediaVisible}
                                    >Stalkerpedia
                                    </div>
                                </div>
                                <div className={(uiState.state.visibleContainer === "news" ? "" : "hidden")}>
                                    <ArticleContainer articleContainer={articleContainer}/>
                                </div>
                                <div className={(uiState.state.visibleContainer === "stalkerpedia" ? "" : "hidden")}>
                                    <ArticleContainer articleContainer={stalkerpediaContainer}/>
                                </div>
                            </div>
                        }
                    </Subscribe>
                </Provider>
            </div>
        )
    }
}

export default App

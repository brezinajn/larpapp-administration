import {Container} from 'unstated'

type VisibleContainer = "news" | "stalkerpedia"


interface IUIStateContainerState {
    readonly visibleContainer: VisibleContainer
}


const defaultState: IUIStateContainerState = {
    visibleContainer: "news"
}

export default class UIStateContainer extends Container<IUIStateContainerState> {


    public state: IUIStateContainerState = {
        ...defaultState
    }

    public setVisibleContainer = (visibleContainer: VisibleContainer) => this.setState({visibleContainer})

    public setNewsVisible = () => this.setVisibleContainer("news")
    public setStalkerpediaVisible = () => this.setVisibleContainer("stalkerpedia")

}
import {Container} from 'unstated'

type VisibleContainer = "news" | "stalkerpedia"


interface IUIStateContainerState {
    visibleContainer: VisibleContainer
}


const defaultState: IUIStateContainerState = {
    visibleContainer: "news"
}

export default class UIStateContainer extends Container<IUIStateContainerState> {


    public state: IUIStateContainerState = {
        ...defaultState
    }

    public setVisibleContaner = (visibleContainer: VisibleContainer) => this.setState({visibleContainer})

    public setNewsVisible = () => this.setVisibleContaner("news")
    public setStalkerpediaVisible = () => this.setVisibleContaner("stalkerpedia")

}
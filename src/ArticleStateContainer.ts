import {firestore, storage} from "firebase"
import {Container} from 'unstated'
import * as uuid from "uuid/v1"
import FieldValue = firestore.FieldValue

export type UploadState = "ERROR" | "FINISHED" | "IDLE" | "STARTED"

interface IUploadStates {
    IDLE: UploadState,
    ERROR: UploadState,
    FINISHED: UploadState,
    STARTED: UploadState
}

export const UploadStates: IUploadStates = {
    ERROR: "ERROR",
    FINISHED: "FINISHED",
    IDLE: "IDLE",
    STARTED: "STARTED"
}

interface IStateContainerState {
    articleToEditId: string | undefined
    articleToEdit: IArticle,
    collectionReference: string,
    uploadState: UploadState
    articles: Array<IKeyValuePair<IArticle>>
    subscriber: null | (() => void)
    environment: string,
    endpoint: string
}

interface IArticleContainerProps {
    environment: string,
    endpoint: string
}

const defaultArticle: IArticle = {
    content: "",
    createdAt: undefined,
    imageUrl: null,
    title: ""
}

export default class ArticleStateContainer extends Container<IStateContainerState> {


    constructor({environment, endpoint}: IArticleContainerProps) {
        super()

        this.state = {
            articleToEdit: {
                ...defaultArticle
            },
            articleToEditId: undefined,
            articles: [],
            collectionReference: `/default/${environment}/${endpoint}`,
            endpoint,
            environment,

            subscriber: null,
            uploadState: UploadStates.IDLE
        }
    }

    public setArticleTitle = (title: string) => this.setState({
        articleToEdit: {
            ...this.state.articleToEdit,
            title
        }
    })

    public setArticleContent = (content: string) => this.setState({
        articleToEdit: {
            ...this.state.articleToEdit,
            content
        }
    })

    public setUploadState = (uploadState: UploadState) => this.setState({uploadState})

    public setArticleUrl = async (file: File | null) => {

        let uploadState: UploadState = UploadStates.IDLE
        let url = null

        if (file) {
            await this.setUploadState(UploadStates.STARTED)

            try {
                const task = await storage().ref(`/${this.state.environment}/${this.state.endpoint}/`)
                    .child(uuid())
                    .put(file)

                url = task.ref.fullPath
                uploadState = UploadStates.FINISHED

            } catch (e) {
                uploadState = UploadStates.ERROR
                alert(e.message)
            }

        }


        return this.setState({
            articleToEdit: {
                ...this.state.articleToEdit,
                imageUrl: url
            },
            uploadState
        })
    }

    public resetArticle = () => this.setState({
        articleToEdit: {...defaultArticle},
        articleToEditId: undefined,
        uploadState: UploadStates.IDLE
    })


    public setSubscriber = (subscriber: () => void) => this.setState({subscriber})

    public saveArticle = async () => {

        const collection = firestore()
            .collection(this.state.collectionReference)

        let doc
        if (this.state.articleToEditId) {
            doc = collection.doc(this.state.articleToEditId)
        } else {
            doc = collection.doc()
        }

        await doc.set({
            ...this.state.articleToEdit,
            createdAt: FieldValue.serverTimestamp()
        })

        return this.resetArticle()
    }


    public setArticles = (articles: Array<IKeyValuePair<IArticle>>) => this.setState({articles})


    public deleteArticle = (articleId: string) => firestore()
        .collection(this.state.collectionReference)
        .doc(articleId)
        .delete()

}
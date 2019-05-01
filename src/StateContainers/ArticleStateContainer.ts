import {firestore, storage} from "firebase"
import {Container} from 'unstated'
import * as uuid from "uuid/v1"
import FieldValue = firestore.FieldValue

export type UploadState = "ERROR" | "FINISHED" | "IDLE" | "STARTED"


interface IStateContainerState {
    readonly articleToEdit: IArticle,
    readonly collectionReference: string,
    readonly uploadState: UploadState
    readonly articles: Array<IKeyValuePair<IArticle>>
    readonly subscriber: null | (() => void)
    readonly environment: string,
    readonly endpoint: string
}

interface IArticleContainerProps {
    readonly environment: string,
    readonly endpoint: string
}

const defaultArticle: IArticle = {
    content: "",
    createdAt: undefined,
    id: null,
    imageUrl: null,
    title: "",
    titleLowerCase: ""
}

export default class ArticleStateContainer extends Container<IStateContainerState> {
    constructor({environment, endpoint}: IArticleContainerProps) {
        super()

        this.state = {
            articleToEdit: {
                ...defaultArticle
            },
            articles: [],
            collectionReference: `/default/${environment}/${endpoint}`,
            endpoint,
            environment,

            subscriber: null,
            uploadState: "IDLE"
        }
    }

    public setArticleTitle = (title: string) => this.setState({
        articleToEdit: {
            ...this.state.articleToEdit,
            title,
            titleLowerCase: title.toLowerCase()
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

        let uploadState: UploadState = "IDLE"
        let url = null

        if (file) {
            await this.setUploadState("STARTED")

            try {
                const task = await storage().ref(`/${this.state.environment}/${this.state.endpoint}/`)
                    .child(uuid())
                    .put(file)

                url = task.ref.fullPath
                uploadState = "FINISHED"

            } catch (e) {
                uploadState = "ERROR"
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
        uploadState: "IDLE"
    })


    public setSubscriber = (subscriber: () => void) => this.setState({subscriber})

    public saveArticle = async () => {

        if(!this.state.articleToEdit.title || !this.state.articleToEdit.content){
            alert("Both title and content need to be filled")
            return
        }


        const collection = firestore()
            .collection(this.state.collectionReference)

        let doc
        if (this.state.articleToEdit.id) {
            doc = collection.doc(this.state.articleToEdit.id)
        } else {
            doc = collection.doc()
        }

        await doc.set({
            ...this.state.articleToEdit,
            createdAt: FieldValue.serverTimestamp(),
            id: doc.id
        })

        return this.resetArticle()
    }


    public setArticles = (articles: Array<IKeyValuePair<IArticle>>) => this.setState({articles})


    public deleteArticle = (articleId: string) => firestore()
        .collection(this.state.collectionReference)
        .doc(articleId)
        .delete()

}
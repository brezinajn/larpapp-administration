import {firestore} from "firebase"
import * as React from "react"

interface IArticleListenerProps {
    readonly reference: string,
    readonly subscriber: null | (() => void)
    onSubscriberCreated(subscriber: () => void): void
    onDataChanged(articles: Array<IKeyValuePair<IArticle>>): void
}

export default function ArticleListener({reference, subscriber, onSubscriberCreated, onDataChanged}: IArticleListenerProps) {
    if (!subscriber) {
        const newSubscriber = firestore().collection(reference).orderBy("createdAt", "desc")
            .onSnapshot((querySnapshot => {
                const result = querySnapshot.docs.map(docSnapshot => ({
                    key: docSnapshot.id,
                    value: docSnapshot.data() as IArticle
                }))
                onDataChanged(result)
            }))

        onSubscriberCreated(newSubscriber)
    }
    return <div/>
}
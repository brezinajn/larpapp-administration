import * as React from "react"
import {Provider, Subscribe} from "unstated"
import ArticleEdit from "../ArticleList/ArticleEdit"
import ArticleList from "../ArticleList/ArticleList"
import ArticleListener from "../ArticleListener/ArticleListener"
import ArticleStateContainer from "../StateContainers/ArticleStateContainer"

interface IAllArticleComponentsProps {
    articleContainer: ArticleStateContainer
}

export default function ArticleContainer({articleContainer}: IAllArticleComponentsProps) {

    return <Provider inject={[articleContainer]}>
        <Subscribe to={[ArticleStateContainer]}>
            {
                (articleState: ArticleStateContainer) => (
                    <div className="tab-page">
                        <h1>{articleState.state.endpoint}</h1>
                        <ArticleEdit article={articleState.state.articleToEdit}
                                     uploadState={articleState.state.uploadState}
                                     onTitleChanged={articleState.setArticleTitle}
                                     onContentChanged={articleState.setArticleContent}
                                     onFileChanged={articleState.setArticleUrl}
                                     onSubmitClicked={articleState.saveArticle}
                        />
                        <ArticleList
                            articles={articleState.state.articles}
                            onDeleteClicked={articleState.deleteArticle}
                        />
                        <ArticleListener
                            reference={articleState.state.collectionReference}
                            onDataChanged={articleState.setArticles}
                            onSubscriberCreated={articleState.setSubscriber}
                            subscriber={articleState.state.subscriber}
                        />
                    </div>
                )}
        </Subscribe>
    </Provider>

}

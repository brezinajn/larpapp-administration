import * as React from 'react'
import ArticleItem from "./ArticleItem"

interface INewsListProps {
    articles: Array<IKeyValuePair<IArticle>>
    onDeleteClicked: (articleId: string) => void
}

export default function ArticleList({articles, onDeleteClicked}: INewsListProps) {
    return (
        <>
            {articles.map((articleKVPair) =>
                <ArticleItem
                    key={articleKVPair.key}
                    article={articleKVPair.value}
                    articleId={articleKVPair.key}
                    onDeleteClicked={onDeleteClicked}
                />
            )}
        </>
    )
}


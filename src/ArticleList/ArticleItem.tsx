import * as React from 'react'
// import {storage} from "firebase"

interface IArticleItemProps {
    article: IArticle,
    articleId: string,
    onDeleteClicked: (articleId: string) => void
}

export default function ArticleItem({article, articleId, onDeleteClicked}: IArticleItemProps) {
    let date
    if (article.createdAt) {
        date = article.createdAt.toDateString() + " " + article.createdAt.toTimeString()
    } else {
        date = "Pending..."
    }

    return (<div>
        <span>{article.title}</span>
        <span>{article.content.substr(0, 30).concat("...")}</span>
        <span>{date}</span>
        <button onClick={onButtonClickedFactory(articleId, onDeleteClicked)}>Delete</button>
    </div>)
}


function onButtonClickedFactory(itemId: string, onClicked: (itemId: string) => void) {
    return (e: any) => {onClicked(itemId)}
}
import * as React from 'react'
import {ChangeEvent, FormEvent} from 'react'
import {UploadState} from "../StateContainers/ArticleStateContainer"

interface IArticleEditProps {
    readonly article: IArticle,
    readonly uploadState: UploadState

    onTitleChanged(title: string): void

    onContentChanged(content: string): void

    onFileChanged(file: File | null): void

    onSubmitClicked(): void
}

export default function ArticleEdit({
                                        article,
                                        uploadState,
                                        onTitleChanged,
                                        onContentChanged,
                                        onFileChanged,
                                        onSubmitClicked
                                    }: IArticleEditProps) {
    return <>
        <div className="flex row100 create-article-wrap">

          <div className="row100 input-group">
            <label>Title</label><input id="title" type="text" value={article.title}
                                       onInput={onTextInputChangedFactory(onTitleChanged)}/>
          </div>
          <div className="row100 input-group">
            <label>Content</label><textarea value={article.content}
                                            onInput={onTextInputChangedFactory(onContentChanged)}/>
          </div>
          <div className="row100 input-group image-upload">
            <label>Image</label><input type="file" onChange={onFileInputChangedFactory(onFileChanged)}/><input
                type="checkbox" checked={uploadState === "FINISHED"} disabled={true}/>
            <UploadingMessage
                visible={uploadState === "STARTED"}
            />
            <ErrorMessage visible={uploadState === "ERROR"}/>
          </div>
          <div className="row100 input-group submit">
            <button onClick={onSubmitClicked} className="pink-btn">Submit</button>
          </div>
        </div>
    </>


}


interface IVisibleProps {
    readonly visible: boolean
}

function ErrorMessage({visible}: IVisibleProps) {
    if (visible) {
        return <span>Error!</span>
    } else {
        return null
    }
}


function UploadingMessage({visible}: IVisibleProps) {
    if (visible) {
        return <span>Uploading...</span>
    } else {
        return null
    }
}

function onFileInputChangedFactory(onFileChanged: (file: File | null) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || []
        onFileChanged(files[0])
    }

}

function onTextInputChangedFactory(onTitleChanged: (title: string) => void) {
    return (e: FormEvent<any>) => {
        const title = e.currentTarget.value
        onTitleChanged(title)
    }
}

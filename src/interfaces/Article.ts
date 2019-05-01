import Timestamp = firebase.firestore.Timestamp


interface IArticle {
    id: string | null
    title: string
    content: string
    imageUrl: string | null
    createdAt: Timestamp | undefined,
    titleLowerCase: string
}
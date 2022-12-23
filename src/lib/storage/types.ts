export type LocalStore = Folder[]

export interface Folder {
  id: string
  name: string
  images: Image[]
}

export interface Image {
  id: string
  type: 'base64'
  data: string
}

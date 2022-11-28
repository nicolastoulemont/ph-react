export type LocalStore = Folder[]

export interface Folder {
  name: string
  images: Image[]
}

export interface Image {
  type: 'base64'
  data: string
}

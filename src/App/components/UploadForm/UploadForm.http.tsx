import loadImage from 'blueimp-load-image'
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from '../../../Constants'

export async function uploadImage(file: File) {
  const { image } = (await loadImage(file, {
    maxWidth: 400,
    maxHeight: 400,
    canvas: true,
  })) as { image: HTMLCanvasElement }

  const imageBase64 = image.toDataURL('image/png')
  const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, '')
  const data = {
    image_file_b64: imageBase64Data,
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(data),
  })

  if (response.status >= 400 && response.status < 600) {
    throw new Error('Bad response from server')
  }

  const result = await response.json()
  return BASE64_IMAGE_HEADER + result.result_b64
}

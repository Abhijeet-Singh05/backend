export interface UploadPayload {
  file: File
  title?: string
  description?: string
}

export interface UploadResponse {
  data: {
    id: string
    url: string
  }
}

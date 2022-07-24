import { RequestEnum } from '@/enums/httpEnum'

export interface RequestModel {
  method: RequestEnum.GET | RequestEnum.POST | RequestEnum.DELETE | RequestEnum.PUT | RequestEnum.PATCH
  url: string
  params: any
}

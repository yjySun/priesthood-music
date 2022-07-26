import axios from './axios'
import { RequestEnum } from '@/enums/httpEnum'
import { RequestModel } from './type'

export const request = (requestModel: RequestModel): Promise<any> => {
  return new Promise((resolve, reject) => {
    let promise
    if (requestModel.method.toUpperCase() === RequestEnum.GET) {
      promise = axios({
        method: RequestEnum.GET,
        url: requestModel.url,
        params: requestModel.params
      })
    } else if (requestModel.method.toUpperCase() === RequestEnum.POST) {
      promise = axios({
        method: RequestEnum.GET,
        url: requestModel.url,
        data: requestModel.params
      })
    }

    promise
      .then((res) => {
        if (!requestModel.returnResData) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

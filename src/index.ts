interface IAnyObj {
  [propName: string]: string
}

export const getQueryObject = (url: string):IAnyObj => {
  url = (url === null || url === undefined) ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  try {
    search.replace(reg, (rs: string, $1: string, $2: string) => {
      const name = $1
      const val = $2
      obj[name] = val
      return rs
    })
    return obj
  } catch (e) {
    return obj
  }
}

export const copyTexts = (texts: string): Promise<void> => {
  const textArea = document.createElement('textarea')
  textArea.innerText = texts
  textArea.setAttribute('style', 'height: 0px;')
  document.body.appendChild(textArea)
  textArea.select()
  return new Promise((resolve, reject) => {
    if ('execCommand' in document) {
      document.execCommand('copy')
      resolve()
    } else {
      reject()
    }
  })
}


const ct = {
  getQueryObject,
  copyTexts
}
export default ct

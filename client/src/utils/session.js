// get from session (if the value expired it is destroyed)
export function sessionGet(key) {
    // let stringValue = window.sessionStorage.getItem(key)
    let stringValue = window.localStorage.getItem(key)
      if (stringValue !== null) {
        let value = JSON.parse(stringValue)
          let expirationDate = new Date(value.expirationDate)
          if (expirationDate > new Date()) {
            return value.value
          } else {
            window.sessionStorage.removeItem(key)
          }
      }
      return null
  }
  
  // add into session
  export function sessionSet(key, value, expirationInMin = 10) {
    let expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin))
      let newValue = {
      value: value,
      expirationDate: expirationDate.toISOString()
    }
    // window.sessionStorage.setItem(key, JSON.stringify(newValue))
    window.localStorage.setItem(key, JSON.stringify(newValue))
  }
import {useState} from 'react'

export default function useForceUpdate() {
  const [tmp, setTmp] = useState(-1)
  function forceUpdate() {
    setTmp(Math.random())
  }
  return {
    forceUpdate: forceUpdate
  }
}

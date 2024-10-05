import { ChangeEvent } from "react"

const useHiddenUploadForm = (props:{onUpload:(event:ChangeEvent<HTMLInputElement>)=>void}) => {
  const onClickUpload = () => document.getElementById('fileUpload')?.click()
  const UploadForm    = () => {
    return(<input
      hidden
      id='fileUpload'
      type='file'
      accept='application/json'
      onChange={props.onUpload}/>)
  }
  return {UploadForm, onClickUpload}
}

export default useHiddenUploadForm
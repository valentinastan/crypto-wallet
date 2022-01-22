import React, { useState } from 'react'

const AddTokenForm = () => {

  const [token, setState] = useState('')
  
  //const dispatch = useDispatch()

  // const sendPost = () => {
  //   postPostRequest({
  //     title: state.titlePost,
  //     text: state.textPost
  //   }).then((post) => dispatch({
  //     type: 'NEW_POST',
  //     post
  //   }))
  // }

  const importToken = () => {
    console.log('importam tokenul...', token)
  }

  return(
    <React.Fragment>
      <div className='addTokenForm'>
        <div>Token Address</div>
        <input id="importTokenAddress" type="text" onChange={(event) => setState(event.target.value)}></input> <br/>
        <button type='button' onClick={importToken}>Import</button>
      </div>
    </React.Fragment>
  )
}
export default AddTokenForm
import { Component } from 'react'
import { Alert } from 'react-bootstrap'

class ErrorAlert extends Component {
  hideHandler = () => {
    // console.log(e)
    // console.log('ini error alert hide')
    this.props.close()
  }
  render () {
    const  errors  = this.props.errors
    let ShownError = []
    ShownError = errors.map((err, idx) => {
      return <h5 key={idx} className="m-1">{err}</h5>
    })
    return (
      <Alert dismissible 
        variant="danger" 
        onClose={this.hideHandler} 
        className="text-center"
      >
        { ShownError }
      </Alert>
    )
  }
}

export default ErrorAlert

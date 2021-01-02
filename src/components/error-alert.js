import { Component } from 'react'
import { Alert } from 'react-bootstrap'

class ErrorAlert extends Component {
  constructor () {
    super()
    this.state = {
      hide: false
    }
  }
  hideHandler = (e) => {
    console.log(e)
    // console.log('ini error alert hide')
    this.setState({ hide: true })
  }
  render () {
    const  errors  = this.props.errors
    if (!errors.length || this.state.hide) {
      return <></>
    }
    let ShownError = []
    ShownError = errors.map((err, idx) => {
      return <p key={idx}>{err}</p>
    })
    return (
      <Alert dismissible variant="danger" onClose={this.hideHandler}>
        <Alert.Heading className="h5">Ooops, error(s) just happened </Alert.Heading>
        { ShownError }
      </Alert>
    )
  }
}

export default ErrorAlert

import React from 'react';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const id = this.props.match.params.id;
    return (
      <>
        <button onClick={() => this.props.deleteStream(id)} className="ui primary button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    )
  }

  onDelete() {
    this.props.deleteStream(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Modal
          title="Delete Stream"
          content="Are you sure you want to delete this stream?"
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}          
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, {
  fetchStream,
  deleteStream
})(StreamDelete);
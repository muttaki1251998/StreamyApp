import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';
import flv from 'flv.js';

class StreamShow extends React.Component {

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }


  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }
  
  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();

  }

  render() {

    if (!this.props.stream) {
      return <div>Loading</div>
    }

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
        {this.props.stream.title}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
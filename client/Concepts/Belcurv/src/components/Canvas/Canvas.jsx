import React     from 'react';
import PropTypes from 'prop-types';

export default class Canvas extends React.Component {

  canvasRef = React.createRef();

  componentDidMount() {
    let canvas  = this.canvasRef.current;
    let context = canvas.getContext('2d');
    context.scale(this.props.scale, this.props.scale);
    this.props.onContext(context);
  }

  render() {
    const { width, height } = this.props;
    const canvasClass = `canvas ${this.props.className}`;
    return (
      <canvas className={ canvasClass } ref={ this.canvasRef }
        width={ `${width}px` } height={ `${height}px` }
        style={ { display: 'block' } }
      />
    );
  }

}

Canvas.propTypes = {
  className : PropTypes.string,
  scale     : PropTypes.number.isRequired,
  height    : PropTypes.number.isRequired,
  width     : PropTypes.number.isRequired,
  onContext : PropTypes.func.isRequired,
};

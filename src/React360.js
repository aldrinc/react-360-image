import React, { Component } from "react";
import "./React360.css";

// You can play with this to adjust the sensitivity
// higher values make mouse less sensitive
const pixelsPerDegree = 3;

class React360 extends Component {
  static defaultProps = { dir: "awair-360", numImages: 55 };

  state = {
    dragging: false,
    imageIndex: 0,
    dragStartIndex: 0
  };

  componentDidMount = () => {
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("mouseup", this.handleMouseUp, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousemove", this.handleMouseMove, false);
    document.removeEventListener("mouseup", this.handleMouseUp, false);
  };

  handleMouseDown = e => {
    e.persist();
    this.setState(state => ({
      dragging: true,
      dragStart: e.screenX,
      dragStartIndex: state.imageIndex
    }));
  };

  handleMouseUp = () => {
    this.setState({ dragging: false });
  };

  updateImageIndex = currentPosition => {
    let numImages = this.props.numImages;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;
    // pixels moved
    let dx = (currentPosition - dragStart) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    // console.log(index, dragStartIndex, numImages)
    if (index !== imageIndex) {
      this.setState({ imageIndex: index });
    }
  };

  handleMouseMove = e => {
    if (this.state.dragging) {
      this.updateImageIndex(e.screenX);
    }
  };

  preventDragHandler = e => {
    e.preventDefault();
  };

  renderImage = () => {
    const { imageIndex } = this.state;

    return (
      <div className="react360">
        <img
          className="react-360-img"
          alt=""
          src={require(`./${this.props.dir}/${imageIndex}.jpg`)}
        />
      </div>
    );
  };

  render = () => {
    return (
      <div
        className="react-360-img"
        onMouseDown={this.handleMouseDown}
        onDragStart={this.preventDragHandler}
      >
        {this.renderImage()}
      </div>
    );
  };
}

export default React360;

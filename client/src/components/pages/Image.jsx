import "../../assets/css/image.css";
import { withReference } from "../../helper/WithReference";
import * as labels from "../../constants/labels";
import FormButtonsList from "../FormButtonsList";
import React, { Component } from "react";
import ProgressBar from "../Progress";
import { connect } from "react-redux";
import { imageType } from "../../types";
import {
  setImage,
  onSubmit,
  onDelete,
  onUnmount,
  updateProgress,
} from "../../actions/imageActions";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: "",
    };
    this.onDrop = this.onDrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.divOnClick = this.divOnClick.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.fileOnClick = this.fileOnClick.bind(this);
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ activeClass: "" });
    const files = Array.from(e.dataTransfer.files);
    this.props.setImage({ files, imgUrl: this.props.imgUrl });
  }

  onChange(e) {
    const files = Array.from(e.target.files);
    this.props.setImage({ files, imgUrl: this.props.imgUrl });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    this.props.onSubmit({
      url: this.props.url,
      file: this.props.imgFile,
      action: this.props.updateProgress,
    });
  }

  onDelete() {
    if (this.props.busy) return;
    this.props.onDelete({
      url: this.props.url,
    });
  }

  divOnClick() {
    this.props.reference.current.click();
  }

  fileOnClick(e) {
    e.currentTarget.value = "";
  }

  componentDidUpdate() {
    if (this.props.progressValue === 100) this.props.updateProgress(0);
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return (
      <div className="page-form-container">
        <h1>{this.props.title}</h1>
        <form onSubmit={this.onSubmit}>
          <div
            className={`drop-box ${this.state.activeClass}`}
            onDragLeave={() => this.setState({ activeClass: "" })}
            onDragEnter={() => this.setState({ activeClass: "active" })}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            onClick={this.divOnClick}
          >
            <div className="drop-content">
              <img src={this.props.imgUrl} alt="" />
              <label>{labels.UseDragDrop}</label>
              <input
                type="file"
                ref={this.props.reference}
                onChange={this.onChange}
                onClick={this.fileOnClick}
              />
            </div>
            <ProgressBar value={this.props.progressValue} />
          </div>
          <FormButtonsList
            buttOneValue={labels.submit}
            buttTowValue={labels.newEntry}
            buttThreeValue={labels.delImage}
            buttTowAction={this.props.callback}
            buttThreeAction={this.onDelete}
          />
        </form>
      </div>
    );
  }
}

Image.propTypes = imageType;

const mapState = (state) => ({
  url: state.image.url,
  imgUrl: state.image.imgUrl,
  imgFile: state.image.imgFile,
  progressValue: state.image.progressValue,
  callback: state.image.callback,
  busy: state.image.busy,
});

export default connect(mapState, {
  onUnmount,
  setImage,
  onSubmit,
  onDelete,
  updateProgress,
})(withReference(Image));

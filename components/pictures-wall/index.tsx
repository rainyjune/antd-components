import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/es/upload/index';
import { ModalProps } from 'antd/es/modal/index'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component<{ upload: any, modal?: ModalProps }, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      defaultFileListLoaded: false,
      fileList: [],
      notifyFileListReady: this.notifyFileListReady
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (!state.defaultFileListLoaded && Array.isArray(props.upload.fileList) && props.upload.fileList.length) {
      const fileList = state.fileList.concat(props.upload.fileList);
      state.notifyFileListReady(fileList);
      return {
        defaultFileListLoaded: true,
        fileList,
      };
    }
    return null;
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  notifyFileListReady = (fileList: Array<any>): void => {
    if (this.props.upload && this.props.upload.onFileListReady) {
      this.props.upload.onFileListReady(fileList);
    }
  }

  handleChange = (info: any) => {
    // Call the onChange callback function provided by user
    if (this.props.upload.onChange) {
      this.props.upload.onChange({
        ...info
      });
    }

    const { file : { status } } = info;

    let fileList = [...info.fileList];
    // Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList }, () => {
      if (status === 'done' || status === 'removed') {
        // call the onFileListReady callback function provided by user
        this.notifyFileListReady(fileList.filter(file => file.status === 'done'));
      }
    });
  }

  render() {
    const { upload: uploadProps, modal: modalProps = {}} = this.props;
    const { maxCount } = uploadProps;
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          {...uploadProps}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          { Number.isInteger(maxCount) && fileList.length >= maxCount ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          {...modalProps}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall;
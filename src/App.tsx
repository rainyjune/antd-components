import React from "react";
import { Form, Button } from "antd";
import { PicturesWall } from "../components";

import "antd/dist/antd.css";
import "./index.less";

function Demo1(props: any) {
  return (
    <PicturesWall
      upload={{
        action: "https://api.cloudinary.com/v1_1/demo/upload",
        data: {
          upload_preset: "doc_codepen_example",
          tags: "browser_upload",
        },
        /*
        onChange: (info: any) => {
          console.log("onChange:", info);
        },
        onFileListReady: (fileList: any) => {
          console.log(`valid files:`, fileList);
        },
        */
      }}
    />
  );
}

function Demo2(props: any) {
  return (
    <PicturesWall
      upload={{
        action: "https://api.cloudinary.com/v1_1/demo/upload",
        data: {
          upload_preset: "doc_codepen_example",
          tags: "browser_upload",
        },
        onChange: (info: any) => {
          console.log("onChange:", info);
        },
        onFileListReady: (fileList: any) => {
          console.log(`valid files:`, fileList);
        },
        maxCount: 2,
      }}
    />
  );
}

function Demo3(props: any) {
  const [form] = Form.useForm();

  const onFormFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFormFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFailed}
    >
      <Form.Item
        label="Pictures"
        name="pictures"
        rules={[{ required: true, message: "Please upload your pictures" }]}
      >
        <PicturesWall
          upload={{
            action: "https://api.cloudinary.com/v1_1/demo/upload",
            data: {
              upload_preset: "doc_codepen_example",
              tags: "browser_upload",
            },
            onFileListReady: (fileList: any) => {
              // use form.setFieldsValue to update field value
              form.setFieldsValue({
                pictures: fileList,
              });
            },
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function Demo4(props: any) {
  const [form] = Form.useForm();
  const onFormFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFormFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFailed}
    >
      <Form.Item
        label="Pictures"
        name="pictures"
        rules={[{ required: true, message: "Please upload your pictures" }]}
      >
        <PicturesWall
          upload={{
            action: "https://api.cloudinary.com/v1_1/demo/upload",
            data: {
              upload_preset: "doc_codepen_example",
              tags: "browser_upload",
            },
            fileList: [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              },
            ],
            onFileListReady: (fileList: any) => {
              // use form.setFieldsValue to update field value
              form.setFieldsValue({
                pictures: fileList,
              });
            },
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function App() {
  return (
    <>
      <h2>Example #1: Simple</h2>
      <Demo1 />
      <hr />

      <h2>Example #2: Max Count</h2>
      <Demo2 />
      <p>
        Limit files with <code>upload.maxCount</code> property. Maximum 2
        picutres allowed in this example.
      </p>

      <h2>Example #3: Working with a form</h2>
      <Demo3 />

      <h2>Example #4: working with uploaded pictures</h2>
      <Demo4 />

      <h2>API</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>upload</td>
            <td>Upload component properties</td>
            <td>
              <a href="#UploadProps-API">UploadProps</a>
            </td>
            <td>-</td>
          </tr>
          <tr>
            <td>modal</td>
            <td>Modal component properties</td>
            <td>
              <a href="https://ant.design/components/modal/#API">ModalProps</a>
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <h3 id="UploadProps-API">UploadProps API</h3>
      <table className="api-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>action</td>
            <td>The API endpoint which the pictures will be uploadeded to.</td>
            <td>string</td>
            <td>Yes</td>
            <td>''</td>
          </tr>
          <tr>
            <td>onFileListReady</td>
            <td>
              The callback function which will be called when the picture list
              is ready. You would use it when working with forms.
            </td>
            <td>Function</td>
            <td>No</td>
            <td>-</td>
          </tr>
          <tr>
            <td>data</td>
            <td>Extra params when sending the upload Ajax request.</td>
            <td>{`object | (file) => object | Promise<object>`}</td>
            <td>No</td>
            <td>-</td>
          </tr>
          <tr>
            <td>maxCount</td>
            <td>Limit the number of uploaded files.</td>
            <td>number</td>
            <td>No</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

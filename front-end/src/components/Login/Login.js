import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { isAuthenticated } from "../../services/PrivateRouter";
import "./styles.css";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 10,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 8,
    },
  },
};

export const Login = ({ isLogin, setIsLogin }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const onFinish = async (values) => {
    await fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status === 422) {
          return resp.text().then((text) => {
            return text && message.error(text);
          });
        }
        if (resp.status === 200) {
          return resp.text().then((text) => {
            const { token, userDetail } = JSON.parse(text);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userData", userDetail["firstName"]);
            setIsLogin(true);
            message.success("success");
            navigate("/");
          });
        }
        if (resp.status === 400) {
          return resp.text().then((text) => {
            return text && message.error(text);
          });
        }
        if (resp.status === 401) {
          return resp.text().then((text) => {
            return text && message.error(text);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-container">
      <Form
        {...formItemLayout}
        form={form}
        name="loginForm"
        onFinish={onFinish}
        initialValues={{}}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>

          <p>
            {" "}
            If new user click to{" "}
            <Link to={{ pathname: "/signup" }}>Signup</Link>{" "}
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

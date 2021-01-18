import React, { useState } from "react";
import Form from "../../components/sign_form/Form";
import Input from "../../components/sign_input/Input";
import Select from "../../components/sign_select/Select";
import Code from "../../components/sign_code/Code";
import { useHistory } from "react-router-dom";

import Toast from "../../components/toast/index";
import "./Sign.scss";
import banner from "../../imgs/banner.png";
export const Sign = () => {
  const history = useHistory();
  // 是否是必选项
  const [required, setRequired] = useState("*");
  // 协议状态
  const [check, setCheck] = useState(false);
  const courseData = [
    { text: "交互设计", require: false, placeholder: "" },
    { text: "设计模式", require: false, placeholder: "" },
    { text: "数据结构", require: false, placeholder: "" },
    { text: "PHP开发", require: false, placeholder: "" },
    { text: "H5游戏开发", require: false, placeholder: "" },
    { text: "前端开发", require: false, placeholder: "" },
  ];
  const timeData = [
    { text: "周一至周天都可以", require: false, placeholder: "" },
    { text: "周一至周天都可以", require: false, placeholder: "" },
    { text: "仅周六周天有空上课", require: false, placeholder: "" },
  ];
  const sexData = [
    { text: "男", require: false, placeholder: "" },
    { text: "女", require: false, placeholder: "" },
  ];
  const schoolData = [
    { text: "厦门大学", require: false, placeholder: "" },
    { text: "集美大学", require: false, placeholder: "" },
    { text: "华侨大学", require: false, placeholder: "" },
    { text: "厦门理工学院", require: false, placeholder: "" },
    { text: "厦门工艺美术学院", require: false, placeholder: "" },
    { text: "其他", require: true, placeholder: "请输入您的学校名称" },
  ];
  const gradeData = [
    { text: "大一", require: false, placeholder: "" },
    { text: "大二", require: false, placeholder: "" },
    { text: "大三", require: false, placeholder: "" },
    { text: "大四", require: false, placeholder: "" },
    { text: "已毕业", require: false, placeholder: "" },
    { text: "其他", require: true, placeholder: "请输入您的年级" },
  ];
  const getWay = [
    {
      text: "高校老师推荐",
      require: false,
      placeholder: "请填写老师姓名（非必填）",
    },
    {
      text: "同学推荐",
      require: false,
      placeholder: "请填写同学姓名（非必填）",
    },
    {
      text: "朋友推荐",
      require: false,
      placeholder: "请填写朋友姓名（非必填）",
    },
    { text: "其他", require: true, placeholder: "请填写获取途径" },
  ];

  const rules = {
    phone: {
      Reg: "^[1]([3-9])[0-9]{9}$",
      msg: "手机号格式错误",
    },
    email: {
      Reg: "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
      msg: "邮箱号格式错误",
    },
    weixin: {
      Reg: "^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$",
      msg: "微信号格式错误",
    },
  };
  function checked() {
    return check ? setCheck(false) : setCheck(true);
  }
  // 表单提交
  function toSuccess(data) {
    if (check) {
      console.log(data);
      history.push({
        pathname: "/success",
        query: {
          course: data.course,
        },
      });
    } else Toast.info("请先勾选同意用户服务协议与隐私政策");
  }
  return (
    <div className="sign">
      <div className="banner">
        <img src={banner} />
      </div>
      <Form
        onSubmit={(data) => {
          toSuccess(data);
        }}
      >
        {/* 课程选择 */}
        <div className="course_choose">
          <div className="sign_title">
            线下课程报名
            <span className="required">
              （<span className="xinhao"></span>必填项）
            </span>
          </div>
          {/* 提示 */}
          <div className="sign_tip">
            <i className="icon icon-tip"></i>
            <span className="tip">每一期只能报名一个线下课程哦</span>
            <p>
              上课时间：每周1-3次课，一次半天，共计16周
              <br />
              上课地点：厦门市思明区软件园二期望海路2号
              <br />
              4399大厦
            </p>
          </div>
          <div className="course">
            <Select
              name="course"
              placeholder="请选择课程进行报名"
              label="报名课程"
              optionList={courseData}
              required={required}
            />
            <Select
              name="courseTime"
              placeholder="请选择上课时间"
              label="上课时间"
              optionList={timeData}
              required={required}
            />
          </div>
        </div>
        {/* 个人信息 */}
        <div className="msg_shoose">
          <Input
            name="user"
            placeholder="请输入您的姓名"
            label="姓名"
            required={required}
          />
          <Select
            name="sex"
            placeholder="请选择您的性别"
            label="性别"
            optionList={sexData}
            required={required}
          />
          <Select
            name="school"
            placeholder="请选择您的学校名称"
            label="学校"
            optionList={schoolData}
            required={required}
          />
          <Input
            name="major"
            placeholder="请输入您的专业"
            label="专业"
            required={required}
          />
          <Select
            name="grade"
            placeholder="请选择您的年级"
            label="年级"
            optionList={gradeData}
            required={required}
          />
        </div>
        {/* 联系方式 */}
        <div className="connect_shoose">
          <div className="noregister">未注册，输入手机号将自动注册</div>
          <div className="connect">
            <Input
              name="phone"
              placeholder="请输入您的手机号"
              label="手机"
              required={required}
              rules={rules.phone}
            />
            <Code
              name="phoneCode"
              placeholder="请输入短信验证码"
              label="验证码"
              required={required}
            />
            <Input
              name="postbox"
              placeholder="请输入你的邮箱号"
              label="邮箱"
              required={required}
              rules={rules.email}
            />
            <Input
              name="weixin"
              placeholder="请输入你的微信号（非必填）"
              label="微信"
              rules={rules.weixin}
            />
            <Select
              name="getWay"
              placeholder="请选择获取途径"
              label="获取途径"
              optionList={getWay}
              // inputOthe={wayOther}
              required={required}
            />
          </div>
          <div className="file_choose">
            <span
              onClick={checked}
              className={check ? "icon icon-argumentd" : "icon icon-argument"}
            ></span>
            <span className="file">
              报名线下课程即视为同意《4399云课堂用户服务协议》和《隐私政策》
            </span>
          </div>
          <button className="submit" type="submit">
            提交
          </button>
        </div>
      </Form>
    </div>
  );
};
export default Sign;

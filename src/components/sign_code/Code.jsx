import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FormHok from "../sign_form/FormHoc";
import { FormContext } from "../sign_form/Form";
import "./Code.scss";
import Toast from "../../components/toast/index";
const propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  value: "",
};
// 它将从表单上下文中接收错误和值
const Code = (props) => {
  const formContext = useContext(FormContext);
  const { data, errors } = formContext || {};
  // 是否是必选项
  const { label, name, placeholder, value, required } = props;
  const [telStatus, setTelStatus] = useState(false);
  // 匹配手机号的正则
  const phoneStr = /^[1]([3-9])[0-9]{9}$/;
  useEffect(() => {
    if (phoneStr.test(data.phone) && errors.phone) {
      setTelStatus(true);
    } else setTelStatus(false);
  }, [data]);
  // 为空判断
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true; // 如果为空,返回true
    }
    return false;
  };
  const hasError = !isEmpty(props.errors);
  const renderErrors = () => {
    if (!hasError) {
      return null;
    }
    const errors = props.errors.map((errMsg, i) => (
      <li className="errorLi" key={i}>
        <i className="icon icon-error"></i>
        <span>{errMsg}</span>
      </li>
    ));
    return <ul> {errors} </ul>;
  };
  const onChange = (e) => {
    props.onChange(e.target.value);
  };
  const onBlur = (e) => {
    props.onBlur(e);
  };
  // 获取验证码
  function getCode(e) {
    if (telStatus) {
      let second = 60;
      let timer = setInterval(() => {
        if (second > 0) {
          second -= 1;
          e.target.style.background = "#dedede";
          e.target.innerHTML = second + "秒后重新获取";
        } else if (second <= 0) {
          e.target.style.background = "#00C176";
          e.target.innerHTML = "获取验证码";
          clearInterval(timer);
        }
      }, 1000);
    } else {
      Toast.info("请先输入手机号");
    }
  }
  return (
    <div className="form-code-box">
      <div className="form-code-con">
        <div className="form-code-item clearfix">
          <span className="form-code-required">{required}</span>
          <label className="form-code-name">{label}</label>
          <div className="form-code-fl">
            <div className="form-code">
              <input
                type="number"
                autoComplete="off"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            </div>
          </div>
          <div
            className={
              telStatus ? "code-btn code-btn-green" : "code-btn code-btn-wgite"
            }
            onClick={(e) => getCode(e)}
          >
            获取验证码
          </div>
        </div>
        {renderErrors()}
      </div>
    </div>
  );
};
Code.propTypes = propTypes;
Code.defaultProps = defaultProps;
const FormTextInput = FormHok(Code);
export { Code };
export default FormTextInput;

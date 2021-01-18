import React from "react";
import PropTypes from "prop-types";
import FormHok from "../sign_form/FormHoc";
import "./Input.scss";
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
const TextInput = (props) => {
  // 是否是必选项
  const { label, name, placeholder, value, required } = props;
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
  const onBlur = (req) => {
    if (req.required || req.rules) {
      props.onBlur();
    }
  };
  return (
    <div className="form-input-box">
      <div className="form-input-con">
        <div className="form-input-item clearfix">
          <span className="form-input-required">{required}</span>
          <label className="form-input-name">{label}</label>
          <div className="form-input-fl">
            <div className="form-input">
              <input
                type="textarea"
                maxLength="15"
                autoComplete="off"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={() => onBlur(props)}
                value={value}
              />
            </div>
          </div>
        </div>
        {renderErrors()}
      </div>
    </div>
  );
};
TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
const FormTextInput = FormHok(TextInput);
export { TextInput };
export default FormTextInput;

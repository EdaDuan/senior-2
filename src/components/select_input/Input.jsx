import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";
const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
};
const defaultProps = {
  value: "",
  type: "text",
};

const Input = (props) => {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };
  // 选择框中的input失焦的时候向父组件传递当前的value
  const onBlur = (e) => {
    props.onBlur(e.target.value);
  };
  return (
    <div className="select-input-con clearfix">
      <div className="select-input-item">
        <input
          type="textarea"
          maxLength="15"
          placeholder={props.placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={props.value}
        />
      </div>
    </div>
  );
};
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export { Input };

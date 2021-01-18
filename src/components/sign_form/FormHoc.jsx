import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FormContext } from "./Form";
const propTypes = {
  name: PropTypes.string.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func),
};
const FormHoc = (InputComponent) => {
  const WrappedWithForm = (props) => {
    // 订阅表单上下文
    const {
      data,
      errors,
      setFieldValue,
      registerInput,
      setFieldError,
    } = useContext(FormContext);
    // Input
    // 注册到表单上下文
    // 包装的输入获取正确的输入值和错误
    const inputValue = data[props.name];
    const inputErrors = errors[props.name] || [];
    const findName = (optionList, label) => {
      for (var key in optionList) {
        //执行相关操作
        if (
          optionList[key].text === label &&
          optionList[key].placeholder !== ""
        )
          return true;
      }
    };
    // 匹配正则错误验证
    const regValidator = (val, rules) => {
      if (val && rules) {
        const reg = new RegExp(rules.Reg);
        return reg.test(val) ? [] : [rules.msg];
      }
      return [];
    };
    // 不能为空错误验证
    const requiredValidator = (val) => {
      if (!val) {
        return ["不能为空"];
      }
      return [];
    };
    const arrValidators = (rules, required) => {
      let arr = [];
      if (rules) {
        arr.push(regValidator);
      }
      if (required) {
        arr.push(requiredValidator);
      }
      return arr;
    };
    useEffect(() => {
      // 值以对象还是字符串
      if (typeof data[props.name] === "object") {
        if (props.optionList) {
          data[props.name] = findName(props.optionList, data[props.name].label)
            ? data[props.name]
            : data[props.name].label;
        } else {
          data[props.name] = data[props.name].label;
        }
      }
      // 将当前组件进行存储
      registerInput({
        name: props.name,
        // validators: props.validators,
        validators: arrValidators(props.rules, props.required),
        rules: props.rules,
        optionList: props.optionList,
      });
    }, [props.optionList, props.name]);
    // 劫持onChange回调 存储包装的输入的值形成上下文
    const onChange = (val) => {
      setFieldValue(props.name, val);
      if (props.onChange) {
        props.onChange(val);
      }
    };
    const validateItem = () => {
      const { rules, required } = props;
      const validators = arrValidators(rules, required);
      if (!validators) {
        return [];
      }
      const messages = validators.reduce((result, validator) => {
        const value = data[props.name];
        let err = validator(value, rules);
        return [...result, ...err];
      }, []);

      if (messages.length > 0) {
        errors[props.name] = messages;
      }
      return errors[props.name];
    };
    const onBlur = () => {
      let err = validateItem();
      setFieldError(props.name, err);
    };
    return (
      <InputComponent
        {...props}
        errors={inputErrors}
        value={typeof inputValue === "object" ? inputValue.label : inputValue}
        onBlur={onBlur}
        onChange={onChange}
      />
    );
  };
  WrappedWithForm.propTypes = propTypes;
  return WrappedWithForm;
};
export default FormHoc;

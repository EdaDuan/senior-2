import React, { useState, useEffect } from "react";
import { EnrollHor } from "../components/EnrollHor";
import { EnrollFile } from "../components/EnrollFile";

import "../css/Enroll.css";
// const banner = require( '../imgs/banner.png');
import banner from "../imgs/banner.png";
import tip from "../imgs/tip.png";

export const Enroll = () => {
  const course = ["js高级程序设计", "设计模式", "数据结构"];
  const courseTime = ["星期一", "星期二", "星期三", "星期四", "星期五"];
  const sex = ["男", "女"];
  const school = ["厦门大学", "集美大学", "福州大学", "其他"];
  const grade = ["大一", "大二", "大三", "大四", "其他"];
  const getWay = ["企业官网", "内部推荐", "同学推荐"];

  const [storeData, setStoreData] = useState({
    courseName: "",
    timeName: "",
    userName: "",
    sexName: "",
    schoolName: "",
    majorName: "",
    gradeName: "",
    phoneName: "",
    codeName: "",
    postbox: "",
    wechatName: "",
    getWay: { lable: "", value: "" },
    fileName: false,
  });
  useEffect(() => {
    console.log(storeData);
  });
  return (
    <div className="enrollPage">
      <div className="banner">
        <img src={banner} />
      </div>
      <div className="enroll">
        {/* 课程选择 */}
        <div className="course_choose">
          <div className="enroll_title">
            线下课程报名
            <span>
              (<span className="xinhao"></span>必填项)
            </span>
          </div>
          {/* 提示 */}
          <div className="enroll_tip">
            <div>
              <span className="tipImg">
                <img src={tip} />
              </span>
              每一期只能报名一个线下课程哦
            </div>
            <div>
              <span>上课时间：每周1-3次课，一次半天，共计16周</span>
              <span>上课地点：厦门市思明区软件园二期望海路2号 4399大厦</span>
            </div>
          </div>
          {/* 报名课程 */}
          <EnrollHor
            necessary="true"
            name="报名课程"
            storeName="courseName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择课程进行报名"
            optionList={course}
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="上课时间"
            storeName="timeName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择上课时间"
            optionList={courseTime}
          />
        </div>
        {/* 个人信息 */}
        <div className="msg_shoose">
          <EnrollHor
            necessary="true"
            name="姓名"
            storeName="userName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入您的姓名"
            storeData={storeData}
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="性别"
            storeName="sexName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择您的性别"
            optionList={sex}
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="学校"
            storeName="schoolName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择您的学校名称"
            inputPlacehoder="请输入您的学校名称"
            optionList={school}
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="专业"
            storeName="majorName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入您的专业"
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="年级"
            storeName="gradeName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择您的年级"
            inputPlacehoder="请输入您的年级"
            optionList={grade}
          />
        </div>
        {/* 联系方式 */}
        <div className="connect_shoose">
          <div className="noregister">
            <span>未注册，输入手机号将自动注册</span>
          </div>
          <EnrollHor
            necessary="true"
            name="手机"
            storeName="phoneName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入您的手机号"
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="验证码"
            storeName="codeName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入短信验证码"
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="邮箱"
            storeName="postbox"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入你的邮箱号"
          />
          <div className="line"></div>
          <EnrollHor
            necessary="false"
            name="微信"
            storeName="wechatName"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="input"
            placehoder="请输入你的微信号"
          />
          <div className="line"></div>
          <EnrollHor
            necessary="true"
            name="获取途径"
            storeName="getWay"
            storeData={storeData}
            onsetStoreData={setStoreData}
            type="select"
            placehoder="请选择获取途径"
            inputPlacehoder="请输入同学姓名"
            optionList={getWay}
          />
          <div className="line"></div>
        </div>
        {/* 协议 */}
        <div className="file_choose">
          <EnrollFile
            storeName="fileName"
            storeData={storeData}
            onsetStoreData={setStoreData}
          ></EnrollFile>
          <div className="file">报名线下课程即视为同意《4399云课堂用户服务协议》和《隐私政策》</div>
        </div>
      </div>
      
    </div>
  );
};

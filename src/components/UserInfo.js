export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._userName = document.querySelector(selectorName);
    this._userInfo = document.querySelector(selectorInfo);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.activity = this._userInfo.textContent;
    return userInfo;
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userInfo.textContent = item.occupation;
  }
}



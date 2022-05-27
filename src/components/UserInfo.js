export default class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._userName = document.querySelector(selectorName);
    this._userInfo = document.querySelector(selectorInfo);
    this._userPhoto = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.activity = this._userInfo.textContent;
    userInfo.avatar = this._userPhoto.src;

    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
  }

  setUserPhoto(data) {
    this._userPhoto.src = data.avatar;
  }
}

const config = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    APP_NAME: process.env.REACT_APP_APP_NAME,
    RECAPTCHA_KEY : process.env.REACT_APP_RECAPTCHA_KEY,
    TOAST_UI : {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    },
    SET_COOKIEE :function (cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    GET_COOKIE : function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    },
    DELETE_COOKIE : function (cname) {
      document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    DEFAULT_AVATAR : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
  };
  
  export const constants = {
    appLogo: "https://upload.wikimedia.org/wikipedia/en/3/36/VNIT_logo.jpeg?20210930001635",
    themeColor: "#18e9b4",
  };
  
  export default config;
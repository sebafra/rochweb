export class Constants {
  // Global Settings
  public static APP_NAME='Rochman Kambalache';
  public static APP_VERSION='0.0.1';
  //public static GOOGLE_ANALYTICS_TRACK_ID='UA-33759313-6';
  //public static GOOGLE_MAPS_KEY='12345678';
  public static BASE_URL='';

  public static IS_ADMIN_LOGIN = false;
  public static LOGGED_USER = {};
  public static STORAGE = {
    user: "rochman_user"
  };

  public static API_METHOD_CATEGORIES = '/categories'
  public static API_METHOD_SUBCATEGORY = '/subcategories'
  public static API_METHOD_USERS = '/users'
  public static API_METHOD_BANNERS = '/banners'
  public static API_METHOD_ARTICLES = '/articles'
  public static API_METHOD_LOGIN = '/users/login'
  //public static API_METHOD_LOGIN = '/administrators/login'
  public static API_FILE_UPLOAD = '/files/upload'
  static API_METHOD_MAIL_SEND: string;


};

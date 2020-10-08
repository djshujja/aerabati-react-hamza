import serverHostName from "./serverHost";

export const addProductUrl =
  serverHostName + "/api/admin-panel/products/new-product-detail";
export const getAllProductsDetailsUrl =
  serverHostName + "/api/admin-panel/products/load-all-products";
export const deleteProduct =
  serverHostName + "/api/admin-panel/products/delete-product/"; // this requires params
export const editSpecificProduct =
  serverHostName + "/api/admin-panel/products/edit-specific-product/"; // this requires params
export const updateProducts =
  serverHostName + "/api/admin-panel/products/update-products/"; // this requires params
export const signUpUserUrl = serverHostName + "/api/registration/signup";
export const signUpUserByFirebaseUrl =
  serverHostName + "/api/registration/signup/firebase-credentials";
export const loginUserUrl = serverHostName + "/api/registration/login";
export const verifyTokenUrl =
  serverHostName + "/api/registration/login/token-verification/";
export const newPassword =
  serverHostName + "/api/registration/login/new-password";
export const allUsers = serverHostName + "/api/users/";
export const allUsersByPage = serverHostName + "/api/users/";
export const makeAdmin = serverHostName + "/api/users/make-admin/";
export const makeManager = serverHostName + "/api/users/make-manager/";
export const makeDealers = serverHostName + "/api/dealership/make-new/";
export const deleteUser = serverHostName + "/api/users/delete/";
export const dealersInfo = serverHostName + "/api/dealership/dealers-info/";
export const allDealers = serverHostName + "/api/dealership/all/";
export const dealershipDetailedInfo =
  serverHostName + "/api/dealership/detailed-info/";
export const dealerSearch = serverHostName + "/api/dealership/search?all=";
export const allDealersCompanyName =
  serverHostName + "/api/dealership/all-company-name";
export const dealerStats = serverHostName + "/api/dealership/stats/";
export const dealerCars = serverHostName + "/api/dealership/total-cars/";
export const allCars = serverHostName + "/api/cars/all/";
export const loadSpecificProduct =
  serverHostName + "/api/admin-panel/products/load-specific-product/";
export const searchCars = serverHostName + "/api/cars/search-car";
export const allshowrooms = serverHostName + "/api/showrooms";
export const showroomdelete = serverHostName + "/api/showrooms/delete-showroom/";
export const allbookings = serverHostName + "/api/bookings";
export const bookings = serverHostName + "/api/bookings/new";
export const getUsername = serverHostName + "/api/users/get-user/";
export const editUsername = serverHostName + "/api/users/edit-user/";
export const updateStatus =
  serverHostName + "/api/admin-panel/products/status/";
  export const showroomStatus = serverHostName + "/api/showrooms/edit-status/";
  export const editDealer= serverHostName + "/api/dealership/edit-dealer/"

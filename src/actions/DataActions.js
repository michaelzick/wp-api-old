import axios from 'axios';
import alt   from './../alt/alt.js';

class DataActions {

  constructor() {
    // Replace this with your WP installation url
    const appUrl = 'http://localhost';

    this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages`; // Endpoint for getting Wordpress Pages
    this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
    this.menusEndPoint = `${appUrl}/wp-json/wp-api-menus/v2/menus/3`; // Endpoint for getting Wordpress Menus
  }

  // Method for getting data from the provided end point url
  api(endPoint) {
    return new Promise((resolve, reject) => {
      axios.get(endPoint).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  // Method for getting Menus data
  getMenus(cb){
    this.api(this.menusEndPoint).then((response)=>{
      console.log(response);
      const menus   = response;
      const payload = { menus };

      this.getSuccess(payload); // Pass returned data to the store
      cb(payload); // This callback will be used for dynamic rout building
    });
  }

  // Method for getting Pages data
  getPages(cb){
    this.api(this.pagesEndPoint).then((response)=>{
      this.getPosts(response, cb);
    });
  }

  // Method for getting Posts data
  getPosts(pages, cb){
    this.api(this.postsEndPoint).then((response)=>{
      const posts 	= response;
      const payload = { pages, posts };

      this.getSuccess(payload); // Pass returned data to the store
      cb(payload); // This callback will be used for dynamic rout building
    });
  }

  // This returnes an object with Pages and Posts data together
  // The Alt Store will listen for this method to fire and will store the returned data
  getSuccess(payload){
    return payload;
  }
}

export default alt.createActions(DataActions);

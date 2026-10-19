class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;

  }
  async getToken() {


    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload


      })//200, 201

    const loginResponseJson = await loginResponse.json();
    const token = await loginResponseJson.token;
    console.log(token);
    return token;


  }

  async createOrder(orderPayload) {
let response = {}; //javscript object
response.token= await this.getToken(); //add properties to the object for token

 
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          'Authorization': response.token,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const orderResponsejson = await orderResponse.json();
    console.log(orderResponsejson);
    const orderId = await orderResponsejson.orders[0];

    //add properties to the object for orderid
    response.orderId= orderId;
    
    return response;

  }



}
module.exports = {APIUtils};

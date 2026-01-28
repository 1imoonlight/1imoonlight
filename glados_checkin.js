/**
 * @file        glados_checkin.js
 * @cron        0 9 * * *
 * @desc        每天早上9点自动签到 GLaDOS
 */

;(async () => {
  // 1. 请求配置
  const url = "https://glados.cloud/api/user/checkin";
  const method = "POST";
  const headers = {
    "Cookie": "koa:sess=eyJ1c2VySWQiOjU4NTE1NSwiX2V4cGlyZSI6MTc5NTQ4NTk1MzExNSwiX21heEFnZSI6MjU5MjAwMDAwMDB9; koa:sess.sig=c5T86TPGjdKx2HWbMjLy8th6oco",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Host": "glados.cloud",
    "Connection": "keep-alive",
  };
  const body = {
    "token": "glados.cloud"
  };

  // 2. 发起 POST 请求签到
  $httpClient.post(
    {
      url,
      method,
      headers,
      body: JSON.stringify(body),
    },
    (error, response, data) => {
      if (error) {
        console.log("签到请求失败，错误信息：" + error);
      } else {
        console.log("签到完成，返回数据：");
        console.log(data);
      }
      $done(); // 脚本执行完毕
    }
  );
})();

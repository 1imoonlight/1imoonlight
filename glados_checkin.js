/**
 * @file        glados_checkin.js
 * @cron        0 9 * * *
 * @desc        每天早上9点自动签到 GLaDOS (Loon)
 */

!(async () => {
  // 从环境变量读取配置
  const authorization = $loon.get("GLaDOS_AUTHORIZATION") || "30341116719929408944031713315076-1080-1920";
  const cookie = $loon.get("GLaDOS_COOKIE") || "koa:sess=eyJ1c2VySWQiOjU4NTE1NSwiX2V4cGlyZSI6MTc4MjAzMTEwNTU3MiwiX21heEFnZSI6MjU5MjAwMDAwMDB9; koa:sess.sig=H4FvivKk1MVD5h47CpI2jp_6fgo; __stripe_mid=9e72becb-60f5-4801-a8cb-e5054002bbf0fac4ce";

  // 检查环境变量是否已设置
  if (!authorization || !cookie) {
    console.log("请在 Loon 的插件管理中配置 Authorization 和 Cookie");
    $notification.post("GLaDOS 签到", "配置未完成", "请设置有效的 Authorization 和 Cookie");
    return;
  }

  // 请求配置
  const url = "https://glados.rocks/api/user/checkin";
  const headers = {
    "Authorization": authorization,
    "Cookie": cookie,
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Host": "glados.rocks",
    "Connection": "keep-alive"
  };
  const body = JSON.stringify({
    "token": "glados.one"
  });

  // 发起 POST 请求签到
  $httpClient.post({ url, headers, body }, (error, response, data) => {
    if (error) {
      console.log("签到请求失败：", error);
      $notification.post("GLaDOS 签到", "请求失败", error);
    } else {
      console.log("响应状态码：", response.statusCode);
      console.log("响应内容：", data);
      $notification.post("GLaDOS 签到", "请求成功", data ? data : "无返回内容");
    }
    $done();
  });
})();

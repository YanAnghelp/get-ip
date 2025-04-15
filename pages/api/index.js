export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源（可根据实际需求限制）
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS'); // 允许的请求方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求（浏览器跨域前会先发这个请求）
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // 预检通过，返回空响应即可
  }

  try {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!userIp) {
      return res.status(400).json({ error: '无法获取用户IP地址' });
    }

    res.status(200).json({ ip: userIp });
  } catch (error) {
    console.error('获取用户IP时发生错误:', error);
    res.status(500).json({ error: '服务器错误，请稍后再试' });
  }
}

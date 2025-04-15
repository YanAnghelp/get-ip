// pages/api/getUserIp.js
export default async function handler(req, res) {
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
  
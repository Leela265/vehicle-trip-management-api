import fs from 'fs';
import path from 'path';

const RATE_LIMIT_FILE = path.join(process.cwd(), 'logs', 'rate-limits.json');

const loadRateLimits = () => {
  try {
    const data = fs.readFileSync(RATE_LIMIT_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
};

const saveRateLimits = (data) => {
  fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), 'utf8');
};

const rateLimiterMiddleware = (req, res, next) => {
  if (req.path !== '/vehicles/add/' || req.method !== 'POST') {
    return next();
  }

  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const minuteAgo = now - 60 * 1000; // 1 minute window
  
  const rateLimits = loadRateLimits();
  
  if (!rateLimits[clientIp]) {
    rateLimits[clientIp] = [];
  }
  
  // Remove old requests
  rateLimits[clientIp] = rateLimits[clientIp].filter(
    timestamp => timestamp > minuteAgo
  );
  
  if (rateLimits[clientIp].length >= 3) {
    return res.status(429).json({
      error: 'Too many requests. Max 3 vehicle creations per minute.'
    });
  }
  
  rateLimits[clientIp].push(now);
  saveRateLimits(rateLimits);
  
  next();
};

export default rateLimiterMiddleware;
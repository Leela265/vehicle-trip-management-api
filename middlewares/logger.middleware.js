import fs from 'fs';
import path from 'path';

const logDir = './logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'logs.txt');

export const loggerMiddleware = async (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${req.method} ${req.originalUrl} [${timestamp}]
`;
  
  fs.appendFileSync(logFile, logEntry, 'utf8');
  
  next();
};
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20, // limit each IP to 1 requests per windowMs(in 1 minute)
  message: {
    status: false,
    error: "Too many requests from this IP, please try again after 15 minutes"
  }
});

export default apiLimiter;

import rateLimit from 'express-rate-limit';

// Define the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
  message: {
    status: false,
    error: "Too many requests from this IP, please try again after 15 minutes"
  }
});

export default apiLimiter;

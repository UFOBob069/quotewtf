import rateLimit from 'express-rate-limit';

// Rate limit for file uploads (5 per hour per IP)
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 uploads per hour
  message: 'Too many uploads from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for quote analysis (10 per hour per IP)
export const analysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 analyses per hour
  message: 'Too many analyses from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for subscriptions (3 per hour per IP)
export const subscriptionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 subscriptions per hour
  message: 'Too many subscription attempts from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}); 
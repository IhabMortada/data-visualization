const requestInProgress = {};

const protectConcurrentRequests = (req, res, next) => {
  const { method, url } = req;

  // Create a unique key for the current request
  const requestKey = `${method}-${url}`;

  if (requestInProgress[requestKey]) {
    // If a request with the same key is already in progress, reject the current request
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  // Set the flag to indicate that the request is in progress
  requestInProgress[requestKey] = true;

  // Remove the flag when the current request is completed
  res.on('finish', () => {
    delete requestInProgress[requestKey];
  });

  // Proceed to the next middleware or route handler
  next();
};
export default protectConcurrentRequests;

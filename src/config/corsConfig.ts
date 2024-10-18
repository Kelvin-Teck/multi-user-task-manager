/* Cors Config Options */
export const corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Custom headers allowed
  credentials: true, // Allow credentials like cookies or authentication headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on status 204 for OPTIONS
};


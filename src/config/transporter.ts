import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { create } from "express-handlebars";
import path from "path";

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT),
  service: process.env.EMAIL_SERVICE!,
  secure: false,
  auth: { user: process.env.EMAIL_USER!, pass: process.env.EMAIL_PASS! },
});

// Configure Handlebars view engine
const hbs = create({
  extname: ".hbs", // Extension for Handlebars templates
  defaultLayout: false, // No default layout
});

// Async function to dynamically import nodemailer-express-handlebars
(async () => {
  const { default: nodemailerhbs } = await import(
    "nodemailer-express-handlebars"
  );

  // Handlebars options for Nodemailer
  const handlebarsOptions = {
    viewEngine: hbs, // Pass the Handlebars instance
    viewPath: path.resolve(__dirname, "../mailers/views/"), // Path to the email templates
    extName: ".hbs", // File extension
  };

  // Use Handlebars with Nodemailer
  transporter.use("compile", nodemailerhbs(handlebarsOptions));
})();

export default transporter;

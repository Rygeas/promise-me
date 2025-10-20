import cors from "cors";
import express, { type Express } from "express";
import { create as createHandlebars } from "express-handlebars";
import helmet from "helmet";
import path from "path";
import { pino } from "pino";
import { authRouter } from "@/api/auth/authRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import { handlebarsHelpers } from "@/common/utils/handlebarsHelpers";
import { friendRequestRouter } from "./api/friendRequest/friendRequestRouter";
import { friendShipRouter } from "./api/friendShip/friendShipRouter";
import { pairingCodeRouter } from "./api/pairingCode/pairingCodeRouter";
import { previewRouter } from "./api/preview/previewRouter";
import { promisesRouter } from "./api/promises/promisesRouter";
import { fileRouter } from "./api/upload/fileRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Handlebars View Engine Setup
const hbs = createHandlebars({
	extname: ".html",
	layoutsDir: path.join(process.cwd(), "src", "templates"),
	partialsDir: path.join(process.cwd(), "src", "templates"),
	defaultLayout: false,
	helpers: handlebarsHelpers,
});

app.engine("html", hbs.engine);
app.set("views", path.join(process.cwd(), "src", "templates"));
app.set("view engine", "html");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/auth", authRouter);
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/pairing-codes", pairingCodeRouter);
app.use("/promises", promisesRouter);
app.use("/friendships", friendShipRouter);
app.use("/friend-requests", friendRequestRouter);
app.use("/files", fileRouter);
app.use("/preview", previewRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };

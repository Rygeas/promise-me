import { mongoConnection } from "@/common/database/mongoConnection";
import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

const startServer = async () => {
	try {
		try {
			await mongoConnection.connect();
			logger.info("MongoDB connected successfully");
		} catch (error) {
			logger.warn(`MongoDB connection failed, running without database: ${error}`);
		}

		const port = env.PORT || process.env.PORT || 8080;

		const server = app.listen(port, () => {
			logger.info(`Server (${env.NODE_ENV}) running on port ${port}`);
		});

		const onCloseSignal = () => {
			logger.info("SIGINT received, shutting down...");
			server.close(async () => {
				try {
					await mongoConnection.disconnect();
				} catch (error) {
					logger.warn(`Error disconnecting from MongoDB: ${error}`);
				}
				logger.info("Server closed");
				process.exit();
			});
			setTimeout(() => process.exit(1), 10000).unref();
		};

		process.on("SIGINT", onCloseSignal);
		process.on("SIGTERM", onCloseSignal);
	} catch (error) {
		logger.error(`Failed to start server: ${error}`);
		process.exit(1);
	}
};

startServer();

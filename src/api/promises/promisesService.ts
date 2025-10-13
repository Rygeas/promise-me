import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { genShareCode } from "@/common/utils/shareCode";
import { type MongoPromiseData, type PromiseData, PromisesRepository } from "./promisesRepository";

export class PromisesService {
	private promisesRepository: PromisesRepository;

	constructor(repository: PromisesRepository = new PromisesRepository()) {
		this.promisesRepository = repository;
	}

	async createPromise(
		promiseData: Omit<PromiseData, "_id" | "createdAt" | "updatedAt" | "deletedAt">,
	): Promise<ServiceResponse<PromiseData | null>> {
		try {
			// Business validation
			if (!promiseData.title || promiseData.title.trim().length === 0) {
				return ServiceResponse.failure("Promise title is required", null, StatusCodes.BAD_REQUEST);
			}

			const urlShareCode = genShareCode();

			const processedData = {
				...promiseData,
				timezone: promiseData.timezone || "Europe/Istanbul",
				autoBreach: {
					enabled: promiseData.autoBreach?.enabled ?? true,
					graceMinutes: promiseData.autoBreach?.graceMinutes ?? 60,
				},
				shareCode: urlShareCode,
				conditions: promiseData.conditions || [],
				participants:
					promiseData.participants.map((p) => ({
						...p,
						status: p.status || "pending",
						userId: new mongoose.Types.ObjectId(p.userId),
					})) || [],
			};

			const createdPromise = await this.promisesRepository.createAsync(processedData);
			return ServiceResponse.success<PromiseData>("Promise created successfully", createdPromise);
		} catch (error) {
			console.error("Error creating promise:", error);
			return ServiceResponse.failure("Failed to create promise", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
	async findByUserId(userId: string): Promise<ServiceResponse<PromiseData[] | null>> {
		try {
			const promises = await this.promisesRepository.findByUserIdAsync(userId);
			return ServiceResponse.success("Promises found successfully", promises);
		} catch (error) {
			console.error("Error finding promises:", error);
			return ServiceResponse.failure("Failed to find promises", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
	async findById(id: string): Promise<ServiceResponse<PromiseData | null>> {
		try {
			const promise = await this.promisesRepository.findByIdAsync(id);
			return ServiceResponse.success("Promise found successfully", promise);
		} catch (error) {
			console.error("Error finding promise:", error);
			return ServiceResponse.failure("Failed to find promise", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
	async findInvitedToUser(userId: string): Promise<ServiceResponse<PromiseData[] | null>> {
		try {
			const promises = await this.promisesRepository.findInvitedToUserAsync(userId);
			return ServiceResponse.success("Invited promises found successfully", promises);
		} catch (error) {
			console.error("Error finding invited promises:", error);
			return ServiceResponse.failure("Failed to find invited promises", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async acceptPromise(promiseId: string, userId: string): Promise<ServiceResponse<PromiseData | null>> {
		try {
			const updatedPromise = await this.promisesRepository.acceptPromiseAsync(promiseId, userId);
			await this.promisesRepository.updatePromiseStatusAsync(promiseId, "active");
			if (!updatedPromise) {
				return ServiceResponse.failure("Promise not found", null, StatusCodes.NOT_FOUND);
			}

			return ServiceResponse.success("Promise accepted successfully", updatedPromise);
		} catch (error) {
			console.error("Error accepting promise:", error);
			const errorMessage = (error as Error).message;

			if (errorMessage.includes("not a participant")) {
				return ServiceResponse.failure(errorMessage, null, StatusCodes.FORBIDDEN);
			}

			return ServiceResponse.failure("Failed to accept promise", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async rejectPromise(promiseId: string, userId: string): Promise<ServiceResponse<PromiseData | null>> {
		try {
			const updatedPromise = await this.promisesRepository.rejectPromiseAsync(promiseId, userId);

			if (!updatedPromise) {
				return ServiceResponse.failure("Promise not found", null, StatusCodes.NOT_FOUND);
			}

			return ServiceResponse.success("Promise rejected successfully", updatedPromise);
		} catch (error) {
			console.error("Error rejecting promise:", error);
			const errorMessage = (error as Error).message;

			if (errorMessage.includes("not a participant")) {
				return ServiceResponse.failure(errorMessage, null, StatusCodes.FORBIDDEN);
			}

			return ServiceResponse.failure("Failed to reject promise", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
}

export const promisesService = new PromisesService();

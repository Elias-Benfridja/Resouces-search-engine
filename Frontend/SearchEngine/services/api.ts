import axios from "axios";
import type { Resource, Rating, RatingStats } from "../types/types";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchResources = async (
  topic: string,
  language: string,
): Promise<Resource[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resources/`, {
      topic,
      language,
    });
    return response.data.resources;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Server error");
    }
    throw new Error("Network error");
  }
};

export const submitRating = async (
  resource_url: string,
  resource_title: string,
  stars: number,
): Promise<Rating> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ratings/`, {
      resource_url,
      resource_title,
      stars,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Server error");
    } else {
      throw new Error("Network error");
    }
  }
};

export const fetchRating = async (
  resource_url: string,
): Promise<RatingStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ratings/`, {
    params: { url: resource_url }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Server error");
    } else {
      throw new Error("Network error");
    }
  }
};

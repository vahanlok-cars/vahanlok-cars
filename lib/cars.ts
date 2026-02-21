import type { Car } from "./types";
import carsData from "../data/cars.json";

export function getAllCars(): Car[] {
  return carsData as Car[];
}

export function getCarById(id: string): Car | undefined {
  return (carsData as Car[]).find((car) => car.id === id);
}

export function getCarsByType(type: "new" | "pre-owned"): Car[] {
  return (carsData as Car[]).filter((car) => car.type === type);
}

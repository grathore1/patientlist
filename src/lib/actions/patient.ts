import type { Patient } from "fhir/r4";
import fhirApi from "../api/fhirApi";

export async function createPatient(resource: Patient): Promise<any> {
    try {
        const response = await fhirApi.post('/Patient', resource);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create patient");
    }
}

export async function updatePatient(id: string, resource: Patient): Promise<any> {
    try {
        const response = await fhirApi.put(`/Patient/${id}`, resource);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update patient");
    }
}

export async function getPatient(id: string): Promise<Patient> {
    try {
        const response = await fhirApi.get(`/Patient/${id}`);
        return response.data as Patient;
    } catch (error) {
        throw new Error("Failed to load patient");
    }
} 
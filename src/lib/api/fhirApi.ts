import type { Patient as FHIRPatient } from 'fhir/r4';
import axios from 'axios';
import type { AxiosResponse } from 'axios/index';

const fhirBaseUrl = 'https://fhir-bootcamp.medblocks.com/fhir';

export async function fetchPatients() { /* Fetch patients API logic */ }
export async function createPatient(patientData: FHIRPatient) { /* Create patient API logic */ }
export async function updatePatient(id: string, patientData: FHIRPatient) { /* Update patient API logic */ }
const get = async <T>(path: string): Promise<{ data: T }> => {
    const response = await axios.get<T>(`${fhirBaseUrl}${path}`);
    return response;
};

const put = async <T>(path: string, data: any): Promise<{ data: T }> => {
    const response = await axios.put<T>(`${fhirBaseUrl}${path}`, data);
    return response;
};

const post = async <T>(path: string, data: any): Promise<{ data: T }> => {
    const response = await axios.post<T>(`${fhirBaseUrl}${path}`, data);
    return response;
};

const fhirApi = {
    fetchPatients,
    createPatient,
    get,
    put,
    post
};

export default fhirApi;

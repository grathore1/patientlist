import axios from 'axios';

const fhirBaseUrl = 'https://fhir-bootcamp.medblocks.com/fhir';

const fhirApi = axios.create({
  baseURL: fhirBaseUrl,
  headers: {
    'Content-Type': 'application/fhir+json',
  },
});

// Fetch patients with optional search query
export const fetchPatients = async (search: string = '') => {
  const response = await fhirApi.get(`/Patient${search ? `?name=${search}` : ''}`);
  return response.data;
};

// Create a new patient
export const createPatient = async (patientData: object) => {
  const response = await fhirApi.post('/Patient', patientData);
  return response.data;
};

// Update an existing patient by ID
export const updatePatient = async (id: string, patientData: object) => {
  const response = await fhirApi.put(`/Patient/${id}`, patientData);
  return response.data;
};
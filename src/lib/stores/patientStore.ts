// src/lib/stores/patientStore.ts

import { writable } from 'svelte/store';

const fhirBaseUrl = 'https://fhir-bootcamp.medblocks.com/fhir';

// The main writable store to keep track of the patients list
export const patients = writable([]);

// Add this type definition at the top of the file
type FHIRPatient = Record<string, any>; // Basic type for now, can be made more specific if needed

// Function to fetch patients from the FHIR server
export async function fetchPatients() {
  try {
    const response = await fetch(`${fhirBaseUrl}/Patient`);
    if (!response.ok) throw new Error(`Error fetching patients: ${response.statusText}`);

    const data = await response.json();

    // Assuming the FHIR server returns patients in an array under `entry`
    const fetchedPatients = data.entry
      ? data.entry.map((entry: { resource: FHIRPatient }) => entry.resource)
      : [];

    // Update the patients store with the fetched patients
    patients.set(fetchedPatients);
  } catch (error) {
    console.error(error);
  }
}

// Function to create a new patient on the FHIR server
export async function createPatient(patientData: FHIRPatient) {
  try {
    const response = await fetch(`${fhirBaseUrl}/Patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) throw new Error(`Error creating patient: ${response.statusText}`);
    
    // Refetch patients after creating a new one to ensure the list is updated
    await fetchPatients();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create patient');
  }
}

export async function updatePatient(id: string, patientData: FHIRPatient): Promise<FHIRPatient> {
  const response = await fetch(`${fhirBaseUrl}/Patient/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update patient: ${errorText}`);
  }

  return await response.json();
}

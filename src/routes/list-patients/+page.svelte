<script lang="ts">
  import type { Patient } from 'fhir/r4';
  import clsx from 'clsx';
  import fhirApi from "../../lib/api/fhirApi";

  let page = 0;
  let searchTerm: string = '';
  let patients: Patient[] = [];
  let loading = false;

  // Determines if the search term is a phone number
  const isPhoneNumber = (searchTerm: string) => {
    return !isNaN(Number(searchTerm));
  };

  // Debounce function for search input
  let timer: ReturnType<typeof setTimeout>;
  const debounce = (v: EventTarget | null) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchTerm = (v as HTMLInputElement)?.value;
      page = 0; // Reset to the first page on new search
      fetchPatients();
    }, 300);
  };

  // Fetches the patient data with search and pagination
  const fetchPatients = async () => {
    loading = true;
    try {
      const searchParams: { phone?: string; name?: string } = {};
      if (searchTerm) {
        if (isPhoneNumber(searchTerm)) {
          searchParams.phone = searchTerm;
        } else {
          searchParams.name = searchTerm;
        }
      }

      const queryParams = new URLSearchParams({
        _sort: '-_lastUpdated',
        _count: '20',
        _offset: (page * 20).toString(),
        ...(searchParams.phone ? { phone: searchParams.phone } : {}),
        ...(searchParams.name ? { name: searchParams.name } : {})
      });

      const response = await fhirApi.get<{ entry?: Array<{ resource: Patient }> }>(`/Patient?${queryParams}`);

      patients = response.data.entry?.map((entry) => entry.resource) || [];
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      loading = false;
    }
  };

  // Format patient name for display
  const formatName = (resource: Patient) => {
    const nameElement = resource.name?.[0];
    const firstName = nameElement?.given?.join(' ');
    const lastName = nameElement?.family;
    return lastName ? `${firstName} ${lastName}` : firstName || '';
  };

  // Initial fetch of patients on component mount
  fetchPatients();
</script>

<p class="mb-2">
  <a class="p-2 bg-black text-white" href="/patient">Create Patient</a>
</p>
<h1 class="text-2xl font-semibold mb-4">Patients on the Server</h1>

<!-- Search Input -->
<input
  on:keyup={(e) => debounce(e.target)}
  class="w-full border p-2 mb-4"
  placeholder="Search by name or phone number (exact)"
/>

<!-- Patient Table or Loading Message -->
{#if loading}
  <p class="text-center">Loading...</p>
{:else if patients.length > 0}
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-100">
        <th class="border p-2 text-left">ID</th>
        <th class="border p-2 text-left">Name</th>
        <th class="border p-2 text-left">Gender</th>
        <th class="border p-2 text-left">Birth Date</th>
        <th class="border p-2 text-left">Phone</th>
      </tr>
    </thead>
    <tbody>
      {#each patients as patient}
        <tr class="hover:bg-gray-50">
          <td class="border p-2">
            <a href={`/create-patient/${patient.id}`} class="text-blue-600 hover:underline">
              {patient.id}
            </a>
          </td>
          <td class="border p-2">{formatName(patient)}</td>
          <td class="border p-2">{patient.gender || ''}</td>
          <td class="border p-2">{patient.birthDate || ''}</td>
          <td class="border p-2">{patient.telecom?.find(t => t.system === 'phone')?.value || ''}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p class="text-center">No patients found.</p>
{/if}

<!-- Pagination Controls -->
<div class="mt-4">
  <button
    class={clsx("p-2 text-white", { 'bg-black': page !== 0, 'bg-gray-300': page === 0 })}
    on:click={() => { page--; fetchPatients(); }}
    disabled={page === 0}
  >
    Previous
  </button>
  <button class="p-2 bg-black text-white" on:click={() => { page++; fetchPatients(); }}>
    Next
  </button>
</div>
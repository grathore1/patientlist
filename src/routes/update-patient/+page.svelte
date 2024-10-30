<script lang="ts">
  import type { Patient } from "fhir/r4";
  import { updatePatient, getPatient } from "$lib/actions/patient";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const id = $page.url.searchParams.get('id');
  const dateToday = new Date().toISOString().split("T")[0];
  
  let message: string | undefined = undefined;
  let loading = false;
  let patientLoading = false;

  let firstName: string = '';
  let lastName: string = '';
  let birtDate: string = '';
  let phoneNumber: string = '';
  let gender: "other" | "male" | "female" | "unknown" | undefined = undefined;

  // Function to handle form submission
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!id) return;
    
    loading = true;
    message = undefined;

    try {
      const fhirResource: Patient = {
        resourceType: "Patient",
        name: [{
          given: [firstName],
          family: lastName
        }],
        birthDate: birtDate,
        gender: gender,
        telecom: [{ system: "phone", value: phoneNumber }]
      };

      await updatePatient(id, fhirResource);
      message = "Patient updated successfully!";
      setTimeout(() => goto('/patients'), 1000); // Redirect after 1 second
    } catch (error: any) {
      message = `Error: ${error.message || "An unknown error occurred"}`;
    } finally {
      loading = false;
    }
  };

  // Load patient data when component mounts
  const loadPatient = async () => {
    if (!id) return;
    
    patientLoading = true;
    try {
      const patientData = await getPatient(id);
      
      firstName = patientData.name?.[0]?.given?.[0] || '';
      lastName = patientData.name?.[0]?.family || '';
      birtDate = patientData.birthDate || '';
      gender = patientData.gender;
      phoneNumber = patientData.telecom?.find(contact => contact.system === 'phone')?.value || '';
    } catch (error: any) {
      message = `Error loading patient: ${error.message}`;
    } finally {
      patientLoading = false;
    }
  };

  // Load patient data immediately
  loadPatient();
</script>

<h1 class="text-2xl font-semibold mb-10">Update Patient</h1>

{#if patientLoading}
  <p>Loading patient data...</p>
{:else}
  <form class="space-y-3" on:submit={handleSubmit}>
    <div>
      <label for="first_name" class="font-semibold block">First Name</label>
      <input bind:value={firstName} id="first_name" class="border p-2 w-full" required/>
    </div>
    <div>
      <label for="last_name" class="font-semibold block">Last Name</label>
      <input bind:value={lastName} id="last_name" class="border p-2 w-full" required/>
    </div>
    <div>
      <label for="gender" class="font-semibold block">Gender</label>
      <select bind:value={gender} id="gender" class="border p-2 w-full" required>
        <option value={undefined} disabled>Please select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
    <div>
      <label for="dob" class="font-semibold block">Date of Birth</label>
      <input bind:value={birtDate} id="dob" type="date" max={dateToday} class="border p-2 w-full" required/>
    </div>
    <div>
      <label for="phone" class="font-semibold block">Phone Number</label>
      <input bind:value={phoneNumber} id="phone" class="border p-2 w-full" required/>
    </div>
    <div class="flex gap-2">
      <button type="submit" class="p-2 bg-black text-white" disabled={loading}>
        {loading ? 'Updating...' : 'Update Patient'}
      </button>
      <button type="button" class="p-2 border" on:click={() => goto('/patients')}>
        Cancel
      </button>
    </div>
  </form>
{/if}

{#if message}
  <div class={message.includes('Error') ? 'text-red-500' : 'text-green-500'} class="mt-4">
    {message}
  </div>
{/if> 
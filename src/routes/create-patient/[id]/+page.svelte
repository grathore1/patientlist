<script lang="ts">
  import type { Patient } from "fhir/r4";
  import { createPatient, updatePatient, getPatient } from "$lib/actions/patient";
  import { navigate } from "svelte-routing";
    import { page } from "$app/stores";

  //export let id: string = '';
  let id = $page.params.id;
  

  const dateToday = new Date().toISOString().split("T")[0];
  let message: string | undefined = undefined;
  let loading = false;
  let patientResource: Patient | null = null;
  let patientLoading = false;

  let firstName: string | undefined;
  let lastName: string | undefined;
  let birtDate: string = '';
  let phoneNumber: string | undefined;
  let gender: "other" | "male" | "female" | "unknown" | undefined = undefined;

  // Function to handle form submission
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    loading = true;
    message = undefined;

    // Construct the Patient resource object
    let fhirResource: Patient = {
      resourceType: "Patient",
      name: [{
        given: firstName ? [firstName] : undefined,
        family: lastName
      }],
      birthDate: birtDate,
      gender: gender,
      telecom: phoneNumber ? [{ system: "phone", value: phoneNumber }] : undefined,
      id: id
    };

    try {
      if (id) {
        await updatePatient(id, fhirResource);
        message = "Patient updated successfully!";
      } else {
        await createPatient(fhirResource);
        message = "Patient created successfully!";
      }
      navigate('/');  // Redirect after successful creation/update
    } catch (error: any) {
      message = `Error: ${error.message || "An unknown error occurred"}`;
    } finally {
      loading = false;
    }
  };

  // Function to load an existing patient's data for editing
  const loadPatient = async (id: string) => {
    patientLoading = true;
    try {
      const patientData = await getPatient(id);
      
      firstName = patientData.name?.[0]?.given?.[0] || '';
      lastName = patientData.name?.[0]?.family || '';
      birtDate = patientData.birthDate || '';
      gender = patientData.gender;
      phoneNumber = patientData.telecom?.find(contact => contact.system === 'phone')?.value;
      patientResource = patientData;
    } catch (error) {
      message = "Error loading patient data. Please try again.";
    } finally {
      patientLoading = false;
    }
  };

  // Load patient data if `id` is provided (for editing)
  if (id) {
    loadPatient(id);
  }
</script>

<h1 class="text-2xl font-semibold mb-10">
  {#if id}
    Updating Patient {id}
  {:else}
    Create Patient
  {/if}
</h1>

{#if patientLoading}
  <p>Loading patient data...</p>
{:else}
  <form class="space-y-3" on:submit={handleSubmit}>
    <div>
      <label for="first_name" class="font-semibold block">First Name</label>
      <input bind:value={firstName} id="first_name" name="first_name" class="border p-2 w-full" required/>
    </div>
    <div>
      <label for="last_name" class="font-semibold block">Last Name</label>
      <input bind:value={lastName} class="border p-2 w-full" id="last_name" required />
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
      <input bind:value={birtDate} class="border p-2 w-full" id="dob" type="date" max={dateToday} required/>
    </div>
    <div>
      <label for="phone" class="font-semibold block">Phone Number</label>
      <input bind:value={phoneNumber} class="border p-2 w-full" id="phone" required/>
    </div>
    <div>
      <button type="submit" class="p-2 bg-black text-white" disabled={loading}>
        {#if loading}
          Loading...
        {:else if id}
          Update
        {:else}
          Create
        {/if}
      </button>
    </div>
  </form>
{/if}

{#if message}
  <pre class="text-red-500 mt-4">
    {message}
  </pre>
{/if}
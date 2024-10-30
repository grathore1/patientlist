<script>
    import { goto } from '$app/navigation';
  </script>
  
  <main class="text-center space-y-4">
    <h2 class="text-3xl font-bold">Welcome to the Patient Management System</h2>
    <p>Select an option to get started:</p>
    <div class="space-y-2">
      <button on:click={() => goto('/list-patients')} class="bg-blue-500 text-white px-4 py-2 rounded">View Patient List</button>
      <button on:click={() => goto('/create-patient')} class="bg-blue-500 text-white px-4 py-2 rounded">Create New Patient</button>
    </div>
  </main>
  
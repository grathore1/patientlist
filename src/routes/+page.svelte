<script>
    import { goto } from '$app/navigation';
  </script>
  
  <main class="text-center space-y-4 mt-20">
    <h1 class="text-3xl font-bold mb-8">Patient Management System</h1>
    
    <button on:click={() => goto('/list-patients')} class="bg-blue-500 text-white px-6 py-2 rounded">
      List Patients
    </button>
    
    <button on:click={() => goto('/create-patient')} class="bg-green-500 text-white px-6 py-2 rounded">
      Create New Patient
    </button>
    
  </main>
  
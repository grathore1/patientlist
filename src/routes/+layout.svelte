<script>
  export let title = 'Patient Management System';
</script>

<main class="container mx-auto p-6">
  <header class="flex justify-between items-center py-4 border-b">
    <h1 class="text-2xl font-bold">{title}</h1>
    <nav class="space-x-4">
      <a href="/" class="text-blue-500 hover:underline">Home</a>
      <a href="/list-patients" class="text-blue-500 hover:underline">List Patients</a>
      <a href="/create-patient" class="text-blue-500 hover:underline">Create Patient</a>
    </nav>
  </header>
  <slot />
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
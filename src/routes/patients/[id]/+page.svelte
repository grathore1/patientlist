<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let { patient } = data;
    let isEditing = false;
    let editedPatient = { ...patient };

    async function handleUpdate() {
        try {
            const response = await fetch(`/api/patients/${patient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resourceType: "Patient",
                    id: editedPatient.id,
                    name: [{
                        given: [editedPatient.name],
                    }],
                    gender: editedPatient.gender,
                    birthDate: editedPatient.birthDate,
                    address: [{
                        text: editedPatient.address
                    }],
                    telecom: [{
                        system: "phone",
                        value: editedPatient.phone
                    }, {
                        system: "email",
                        value: editedPatient.email
                    }]
                })
            });

            if (response.ok) {
                patient = editedPatient;
                isEditing = false;
                alert('Patient updated successfully');
            } else {
                alert('Failed to update patient');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update patient');
        }
    }
</script>

<div class="patient-details">
    <div class="header">
        <a href="/patients" class="back-button">← Back to Patients</a>
        <h1>{patient.name}</h1>
        <button class="edit-button" on:click={() => isEditing = !isEditing}>
            {isEditing ? 'Cancel' : 'Edit'}
        </button>
    </div>
    
    {#if isEditing}
        <div class="edit-form">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" bind:value={editedPatient.name}>
            </div>
            
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" bind:value={editedPatient.gender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="birthDate">Birth Date:</label>
                <input type="date" id="birthDate" bind:value={editedPatient.birthDate}>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" bind:value={editedPatient.phone}>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" bind:value={editedPatient.email}>
            </div>
            
            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" bind:value={editedPatient.address}></textarea>
            </div>

            <button class="save-button" on:click={handleUpdate}>Save Changes</button>
        </div>
    {:else}
        <div class="info-grid">
            <div class="info-item">
                <label>Name:</label>
                <span>{patient.name}</span>
            </div>
            
            <div class="info-item">
                <label>Gender:</label>
                <span>{patient.gender}</span>
            </div>
            
            <div class="info-item">
                <label>Birth Date:</label>
                <span>{patient.birthDate}</span>
            </div>
            
            <div class="info-item">
                <label>Phone:</label>
                <span>{patient.phone || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <label>Email:</label>
                <span>{patient.email || 'N/A'}</span>
            </div>
            
            <div class="info-item">
                <label>Address:</label>
                <span>{patient.address || 'N/A'}</span>
            </div>
        </div>
    {/if}
</div>

<style>
    .patient-details {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
    }

    .back-button, .edit-button {
        padding: 8px 16px;
        border-radius: 4px;
        text-decoration: none;
    }

    .back-button {
        background-color: #f0f0f0;
        color: #333;
    }

    .edit-button {
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    .info-grid {
        display: grid;
        gap: 20px;
    }

    .info-item {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 10px;
    }

    .edit-form {
        display: grid;
        gap: 20px;
    }

    .form-group {
        display: grid;
        gap: 8px;
    }

    label {
        font-weight: bold;
    }

    input, select, textarea {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    textarea {
        height: 100px;
        resize: vertical;
    }

    .save-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        justify-self: start;
    }

    .save-button:hover {
        background-color: #45a049;
    }
</style> 
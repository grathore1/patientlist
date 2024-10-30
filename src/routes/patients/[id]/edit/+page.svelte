<script>
    /** @type {import('./$types').PageData} */
    export let data;
    const { patient } = data;

    let formData = { ...patient };

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await fetch(`/api/patients/${patient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Redirect back to patient details page
                window.location.href = `/patients/${patient.id}`;
            } else {
                alert('Failed to update patient');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update patient');
        }
    }
</script>

<div class="edit-patient">
    <div class="header">
        <a href="/patients/{patient.id}" class="back-button">← Back</a>
        <h1>Edit Patient: {patient.name}</h1>
    </div>

    <form on:submit={handleSubmit} class="edit-form">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={formData.name} required>
        </div>

        <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" bind:value={formData.age} required>
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={formData.email} required>
        </div>

        <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" bind:value={formData.phone}>
        </div>

        <div class="form-group">
            <label for="address">Address:</label>
            <textarea id="address" bind:value={formData.address}></textarea>
        </div>

        <div class="form-group">
            <label for="bloodType">Blood Type:</label>
            <select id="bloodType" bind:value={formData.bloodType}>
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>
        </div>

        <div class="button-group">
            <button type="submit" class="save-button">Save Changes</button>
            <a href="/patients/{patient.id}" class="cancel-button">Cancel</a>
        </div>
    </form>
</div>

<style>
    .edit-patient {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
    }

    .back-button {
        padding: 8px 16px;
        border-radius: 4px;
        background-color: #f0f0f0;
        color: #333;
        text-decoration: none;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
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

    .button-group {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .save-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .cancel-button {
        padding: 10px 20px;
        background-color: #f0f0f0;
        color: #333;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
    }

    .save-button:hover {
        background-color: #45a049;
    }
</style> 
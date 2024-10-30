import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request }) {
    try {
        const patientId = params.id;
        const updatedData = await request.json();

        // Here you would typically update the database
        // For now, we'll just return success
        console.log('Updating patient:', patientId, updatedData);
        
        return json({ 
            status: 200, 
            message: 'Patient updated successfully',
            patient: updatedData 
        });
    } catch (error) {
        console.error('Error updating patient:', error);
        return json({ 
            status: 500, 
            message: 'Failed to update patient' 
        }, { status: 500 });
    }
} 
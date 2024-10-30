export async function load({ params }) {
    const patientId = params.id;
    
    // Enhanced mock patient data
    const mockPatient = {
        id: patientId,
        name: "Test Patient",
        age: 30,
        email: "test@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        bloodType: "O+",
        // Add other fields as needed
    };
    
    return {
        patient: mockPatient
    };
} 
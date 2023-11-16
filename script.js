let patientsCount = 0;
let medicinesData = {};

function addDefaultMedicines(patientId) {
    const defaultMedicines = [
        { name: 'Medicine A', frequency: '2 times a day' },
        { name: 'Medicine B', frequency: 'Once daily' }
    ];
    medicinesData[patientId] = defaultMedicines;
}

function addPatient() {
    patientsCount++;
    const patientId = patientsCount;
    medicinesData[patientId] = [];
    
    const patientDiv = document.createElement('div');
    patientDiv.classList.add('patient');
    patientDiv.id = `patient${patientId}`;
    
    patientDiv.innerHTML = `
        <h2>Patient ${patientId}</h2>
        <table id="medicinesTable${patientId}">
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Frequency</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="medicinesBody${patientId}">
                <!-- Medicines for Patient ${patientId} will be displayed here -->
            </tbody>
        </table>
        <div>
            <input type="text" id="medicineName${patientId}" placeholder="Medicine Name">
            <input type="number" id="medicineFrequency${patientId}" placeholder="Frequency">
            <button onclick="addMedicine(${patientId})">Add Medicine</button>
        </div>
        <button onclick="deletePatient(${patientId})">Delete Patient</button>
    `;
    
    document.getElementById('patientsContainer').appendChild(patientDiv);
    displayMedicines(patientId);
}

function deletePatient(patientId) {
    delete medicinesData[patientId];
    const patientDiv = document.getElementById(`patient${patientId}`);
    patientDiv.parentNode.removeChild(patientDiv);
}

function addMedicine(patientId) {
    const medicineName = document.getElementById(`medicineName${patientId}`).value.trim();
    const medicineFrequency = document.getElementById(`medicineFrequency${patientId}`).value.trim();
    if (medicineName && medicineFrequency) {
        medicinesData[patientId].push({ name: medicineName, frequency: medicineFrequency });
        displayMedicines(patientId);
        document.getElementById(`medicineName${patientId}`).value = '';
        document.getElementById(`medicineFrequency${patientId}`).value = '';
    }
}

function deleteMedicine(patientId, rowIndex) {
    medicinesData[patientId].splice(rowIndex, 1);
    displayMedicines(patientId);
}

function displayMedicines(patientId) {
    const tableBody = document.getElementById(`medicinesBody${patientId}`);
    tableBody.innerHTML = ''; // Clear previous content
    
    medicinesData[patientId].forEach((medicine, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = medicine.name;
        cell2.innerHTML = medicine.frequency;
        cell3.innerHTML = `<button onclick="deleteMedicine(${patientId},${index})">Delete</button>`;
    });
}

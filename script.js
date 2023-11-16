function addMedicine() {
    const medicineName = document.getElementById('medicineName').value;
    const frequency = document.getElementById('frequency').value;

    if (medicineName && frequency) {
        const table = document.getElementById('medicinesTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = medicineName;
        cell2.innerHTML = frequency;
        cell3.innerHTML = '<button onclick="deleteMedicine(this)">Delete</button>';

        // Clear input fields after adding medicine
        document.getElementById('medicineName').value = '';
        document.getElementById('frequency').value = '';
    } else {
        alert('Please enter both medicine name and frequency.');
    }
}

function deleteMedicine(row) {
    const i = row.parentNode.parentNode.rowIndex;
    document.getElementById('medicinesTable').deleteRow(i);
}

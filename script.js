let uploadDetailsContainer = document.getElementById("uploadDetailsContainer");
function uploadDetails(){
    if (uploadDetailsContainer.style.display === "none"){
        uploadDetailsContainer.style.display = "block";
    }
    
}
function uploadDetails() {
    // Your logic to handle upload student details functionality goes here
    document.getElementById("uploadDetailsContainer").style.display = "block";
}



// JavaScript code to fetch student data from the server and populate the table

// Fetch all students on page load
fetch('/students')
    .then(response => response.json())
    .then(students => {
        const tableBody = document.getElementById('studentsTable').querySelector('tbody');
        students.forEach(student => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = student.id;
            row.insertCell(1).textContent = student.name;
            // Add cells for other student details
        });
    })
    .catch(error => console.error(error));

// Handle form submission for creating new students
const newStudentForm = document.getElementById('newStudentForm');
newStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newStudentForm);
    const studentData = {};
    formData.forEach((value, key) => {
        studentData[key] = value;
    });
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Update the table with the newly created student
    })
    .catch(error => console.error(error));
});

// Implement similar logic for updating and deleting students
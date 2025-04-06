document.addEventListener('DOMContentLoaded', function() {
    // Get form and results display
    const resultsForm = document.getElementById('results-form');
    const resultsDisplay = document.getElementById('results-display');
    const printBtn = document.getElementById('print-btn');
    
    // Sample student data - in a real application, this would come from a database
    let sampleStudentData = {
        'diploma-2023-123456-789012': {
            name: 'Abdullah Khan',
            fatherName: 'Mohammad Khan',
            institute: 'Dhaka Polytechnic Institute',
            technology: 'Computer Technology',
            roll: '123456',
            registration: '789012',
            gpa: '3.85',
            result: 'PASSED',
            subjects: [
                { code: '66631', name: 'Programming Essentials', credit: '4', grade: 'A', gradePoint: '3.75' },
                { code: '66632', name: 'Web Design', credit: '4', grade: 'A+', gradePoint: '4.00' },
                { code: '66633', name: 'Computer Architecture', credit: '4', grade: 'A-', gradePoint: '3.50' },
                { code: '66634', name: 'Networking', credit: '4', grade: 'B+', gradePoint: '3.25' },
                { code: '66635', name: 'Database Management', credit: '4', grade: 'A', gradePoint: '3.75' }
            ]
        },
        'diploma-2022-234567-890123': {
            name: 'Fatima Rahman',
            fatherName: 'Abdul Rahman',
            institute: 'Rajshahi Polytechnic Institute',
            technology: 'Electrical Technology',
            roll: '234567',
            registration: '890123',
            gpa: '3.92',
            result: 'PASSED',
            subjects: [
                { code: '66731', name: 'Electrical Circuits', credit: '4', grade: 'A+', gradePoint: '4.00' },
                { code: '66732', name: 'Electrical Machines', credit: '4', grade: 'A', gradePoint: '3.75' },
                { code: '66733', name: 'Power Systems', credit: '4', grade: 'A+', gradePoint: '4.00' },
                { code: '66734', name: 'Electronics', credit: '4', grade: 'A', gradePoint: '3.75' },
                { code: '66735', name: 'Electrical Installation', credit: '4', grade: 'A', gradePoint: '3.75' }
            ]
        },
        'hsc-2023-345678-901234': {
            name: 'Tariq Hassan',
            fatherName: 'Jamal Hassan',
            institute: 'Technical School & College, Rangpur',
            technology: 'HSC Vocational',
            roll: '345678',
            registration: '901234',
            gpa: '4.00',
            result: 'PASSED',
            subjects: [
                { code: '1101', name: 'Bangla', credit: '5', grade: 'A+', gradePoint: '4.00' },
                { code: '1102', name: 'English', credit: '5', grade: 'A+', gradePoint: '4.00' },
                { code: '1103', name: 'Mathematics', credit: '5', grade: 'A+', gradePoint: '4.00' },
                { code: '1104', name: 'Physics', credit: '5', grade: 'A+', gradePoint: '4.00' },
                { code: '1105', name: 'Chemistry', credit: '5', grade: 'A+', gradePoint: '4.00' }
            ]
        },
        'ssc-2023-456789-012345': {
            name: 'Nadia Islam',
            fatherName: 'Kamal Islam',
            institute: 'Vocational School, Chittagong',
            technology: 'SSC Vocational',
            roll: '456789',
            registration: '012345',
            gpa: '3.69',
            result: 'PASSED',
            subjects: [
                { code: '1001', name: 'Bangla', credit: '4', grade: 'A', gradePoint: '3.75' },
                { code: '1002', name: 'English', credit: '4', grade: 'A-', gradePoint: '3.50' },
                { code: '1003', name: 'Mathematics', credit: '4', grade: 'A', gradePoint: '3.75' },
                { code: '1004', name: 'Science', credit: '4', grade: 'B+', gradePoint: '3.25' },
                { code: '1005', name: 'Social Science', credit: '4', grade: 'A+', gradePoint: '4.00' }
            ]
        }
    };
    
    // Try to load student data from localStorage when page loads
    loadStudentData();
    
    // Handle form submission
    resultsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const examType = document.getElementById('exam-type').value;
        const year = document.getElementById('year').value;
        const rollNumber = document.getElementById('roll').value;
        const regNumber = document.getElementById('reg').value;
        
        // Create key to look up student data
        const studentKey = `${examType}-${year}-${rollNumber}-${regNumber}`;
        
        // Check if student exists in sample data
        if (sampleStudentData[studentKey]) {
            displayResults(sampleStudentData[studentKey]);
        } else {
            // Show error message
            showAlert('No results found for the given information. Please check your details and try again.', 'error');
        }
    });
    
    // Function to display results
    function displayResults(studentData) {
        // Fill in student information
        document.getElementById('student-name').textContent = studentData.name;
        document.getElementById('institute').textContent = studentData.institute;
        document.getElementById('technology').textContent = studentData.technology;
        document.getElementById('roll-display').textContent = studentData.roll;
        document.getElementById('reg-display').textContent = studentData.registration;
        document.getElementById('gpa-display').textContent = studentData.gpa;
        document.getElementById('result-status').textContent = studentData.result;
        
        // Add result status color
        const resultStatus = document.getElementById('result-status');
        if (studentData.result === 'PASSED') {
            resultStatus.style.color = '#4caf50';
            resultStatus.style.fontWeight = '600';
        } else {
            resultStatus.style.color = '#dc3545';
            resultStatus.style.fontWeight = '600';
        }
        
        // Clear previous results
        const subjectsTable = document.getElementById('subjects-table');
        subjectsTable.innerHTML = '';
        
        // Add subject rows
        studentData.subjects.forEach(subject => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${subject.code}</td>
                <td>${subject.name}</td>
                <td>${subject.credit}</td>
                <td>${subject.grade}</td>
                <td>${subject.gradePoint}</td>
            `;
            
            subjectsTable.appendChild(row);
        });
        
        // Show results section
        resultsDisplay.style.display = 'block';
        
        // Scroll to results
        resultsDisplay.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to show alerts
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        // Add alert to page
        const searchContainer = document.querySelector('.search-container');
        searchContainer.insertBefore(alertDiv, resultsForm);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Handle print button click
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Add styles for alerts
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 10px;
            font-weight: 500;
        }
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        @media print {
            header, .search-section, footer, #print-btn {
                display: none !important;
            }
            .results-container {
                box-shadow: none !important;
                padding: 0 !important;
            }
            body {
                background-color: white !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Load student data from localStorage
    function loadStudentData() {
        try {
            const savedData = localStorage.getItem('btebStudentData');
            if (savedData) {
                sampleStudentData = JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}); 
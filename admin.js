document.addEventListener('DOMContentLoaded', function() {
    // Get admin forms and controls
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addSubjectBtn = document.getElementById('add-subject-btn');
    const studentDataForm = document.getElementById('student-data-form');
    const bulkUploadForm = document.getElementById('bulk-upload-form');
    const downloadTemplateBtn = document.getElementById('download-template');
    const uploadStatusMsg = document.getElementById('upload-status');
    const refreshDataBtn = document.getElementById('refresh-data');
    const exportAllBtn = document.getElementById('export-all');
    const dataTable = document.getElementById('data-table');
    const dataBody = document.getElementById('data-body');
    const noDataMessage = document.getElementById('no-data-message');
    
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
    
    // Load data into the table
    loadDataTable();
    
    // Display JSON example
    const jsonExample = document.getElementById('json-example');
    const templateData = {
        'exam-type-year-roll-reg': {
            name: 'Student Name',
            institute: 'Institute Name',
            technology: 'Technology/Department',
            roll: 'Roll Number',
            registration: 'Registration Number',
            gpa: '0.00',
            result: 'PASSED/FAILED',
            subjects: [
                { 
                    code: 'Subject Code', 
                    name: 'Subject Name', 
                    credit: 'Credit Hours', 
                    grade: 'Letter Grade', 
                    gradePoint: 'Grade Point' 
                }
            ]
        }
    };
    jsonExample.textContent = JSON.stringify(templateData, null, 2);
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected tab content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).style.display = 'block';
        });
    });
    
    // Add subject field
    addSubjectBtn.addEventListener('click', function() {
        const subjectsContainer = document.getElementById('subjects-container');
        const newSubjectEntry = document.createElement('div');
        newSubjectEntry.className = 'subject-entry';
        newSubjectEntry.innerHTML = `
            <button type="button" class="remove-subject-btn">&times;</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Subject Code</label>
                    <input type="text" class="subject-code" required>
                </div>
                <div class="form-group">
                    <label>Subject Name</label>
                    <input type="text" class="subject-name" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Credit</label>
                    <input type="text" class="subject-credit" required>
                </div>
                <div class="form-group">
                    <label>Grade</label>
                    <select class="subject-grade" required>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Grade Point</label>
                    <input type="text" class="subject-grade-point" required>
                </div>
            </div>
        `;
        
        subjectsContainer.appendChild(newSubjectEntry);
        
        // Add event listener for remove button
        const removeBtn = newSubjectEntry.querySelector('.remove-subject-btn');
        removeBtn.addEventListener('click', function() {
            subjectsContainer.removeChild(newSubjectEntry);
        });
    });
    
    // Add remove button to the first subject entry
    const firstSubjectEntry = document.querySelector('.subject-entry');
    if (firstSubjectEntry && !firstSubjectEntry.querySelector('.remove-subject-btn')) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-subject-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', function() {
            // Don't remove if it's the last one
            if (document.querySelectorAll('.subject-entry').length > 1) {
                firstSubjectEntry.remove();
            } else {
                showStatusMessage('At least one subject is required', 'error');
            }
        });
        firstSubjectEntry.insertBefore(removeBtn, firstSubjectEntry.firstChild);
    }
    
    // Handle single student data submission
    studentDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            // Get form values
            const examType = document.getElementById('admin-exam-type').value;
            const year = document.getElementById('admin-year').value;
            const studentName = document.getElementById('student-name-input').value;
            const rollNumber = document.getElementById('admin-roll').value;
            const regNumber = document.getElementById('admin-reg').value;
            const institute = document.getElementById('institute-input').value;
            const technology = document.getElementById('technology-input').value;
            const gpa = document.getElementById('gpa-input').value;
            const result = document.getElementById('result-input').value;
            
            // Get subjects
            const subjectEntries = document.querySelectorAll('.subject-entry');
            const subjects = [];
            
            subjectEntries.forEach(entry => {
                const code = entry.querySelector('.subject-code').value;
                const name = entry.querySelector('.subject-name').value;
                const credit = entry.querySelector('.subject-credit').value;
                const grade = entry.querySelector('.subject-grade').value;
                const gradePoint = entry.querySelector('.subject-grade-point').value;
                
                subjects.push({
                    code,
                    name,
                    credit,
                    grade,
                    gradePoint
                });
            });
            
            // Create student data object
            const studentKey = `${examType}-${year}-${rollNumber}-${regNumber}`;
            const studentData = {
                name: studentName,
                institute: institute,
                technology: technology,
                roll: rollNumber,
                registration: regNumber,
                gpa: gpa,
                result: result,
                subjects: subjects
            };
            
            // Add to student data
            sampleStudentData[studentKey] = studentData;
            
            // Save to local storage
            saveStudentData();
            
            // Update data table
            loadDataTable();
            
            // Show success message
            showStatusMessage('Student data saved successfully!', 'success');
            
            // Reset form
            studentDataForm.reset();
            
            // Reset subject entries to just one
            const subjectsContainer = document.getElementById('subjects-container');
            subjectsContainer.innerHTML = `
                <div class="subject-entry">
                    <button type="button" class="remove-subject-btn">&times;</button>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Subject Code</label>
                            <input type="text" class="subject-code" required>
                        </div>
                        <div class="form-group">
                            <label>Subject Name</label>
                            <input type="text" class="subject-name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Credit</label>
                            <input type="text" class="subject-credit" required>
                        </div>
                        <div class="form-group">
                            <label>Grade</label>
                            <select class="subject-grade" required>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Grade Point</label>
                            <input type="text" class="subject-grade-point" required>
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listener for the new remove button
            const removeBtn = subjectsContainer.querySelector('.remove-subject-btn');
            removeBtn.addEventListener('click', function() {
                // Don't remove if it's the last one
                if (document.querySelectorAll('.subject-entry').length > 1) {
                    removeBtn.closest('.subject-entry').remove();
                } else {
                    showStatusMessage('At least one subject is required', 'error');
                }
            });
            
        } catch (error) {
            showStatusMessage('Error: ' + error.message, 'error');
        }
    });
    
    // Handle bulk upload
    bulkUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('json-file');
        const file = fileInput.files[0];
        
        if (!file) {
            showStatusMessage('Please select a JSON file to upload', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const uploadedData = JSON.parse(e.target.result);
                
                // Validate the data structure
                if (typeof uploadedData !== 'object') {
                    throw new Error('Invalid JSON format. Data must be an object.');
                }
                
                // Merge with existing data
                sampleStudentData = { ...sampleStudentData, ...uploadedData };
                
                // Save to local storage
                saveStudentData();
                
                // Update data table
                loadDataTable();
                
                showStatusMessage(`Successfully imported ${Object.keys(uploadedData).length} student records`, 'success');
                bulkUploadForm.reset();
                
            } catch (error) {
                showStatusMessage('Error: ' + error.message, 'error');
            }
        };
        
        reader.onerror = function() {
            showStatusMessage('Error reading the file', 'error');
        };
        
        reader.readAsText(file);
    });
    
    // Download template
    downloadTemplateBtn.addEventListener('click', function() {
        const templateJSON = JSON.stringify(templateData, null, 2);
        const blob = new Blob([templateJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_data_template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    // Refresh data table
    refreshDataBtn.addEventListener('click', function() {
        loadDataTable();
        showStatusMessage('Data refreshed successfully', 'success');
    });
    
    // Export all data
    exportAllBtn.addEventListener('click', function() {
        saveStudentData(true);
    });
    
    // Function to show status messages
    function showStatusMessage(message, type) {
        uploadStatusMsg.textContent = message;
        uploadStatusMsg.className = 'status-message ' + type;
        uploadStatusMsg.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            uploadStatusMsg.style.display = 'none';
        }, 5000);
    }
    
    // Function to load data into the table
    function loadDataTable() {
        // Clear the table
        dataBody.innerHTML = '';
        
        // Check if there is any data
        const studentCount = Object.keys(sampleStudentData).length;
        if (studentCount === 0) {
            noDataMessage.style.display = 'block';
            dataTable.style.display = 'none';
            return;
        }
        
        // Hide no data message and show table
        noDataMessage.style.display = 'none';
        dataTable.style.display = 'table';
        
        // Add each student to the table
        let index = 1;
        for (const key in sampleStudentData) {
            const student = sampleStudentData[key];
            const row = document.createElement('tr');
            
            // Get exam type and year from key
            const keyParts = key.split('-');
            const examType = keyParts[0];
            const year = keyParts[1];
            
            // Capitalize exam type
            const formattedExamType = examType.charAt(0).toUpperCase() + examType.slice(1);
            
            row.innerHTML = `
                <td>${index}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.registration}</td>
                <td>${formattedExamType}</td>
                <td>${year}</td>
                <td>${student.institute}</td>
                <td>${student.gpa}</td>
                <td><span class="${student.result === 'PASSED' ? 'passed' : 'failed'}">${student.result}</span></td>
                <td>
                    <button class="action-btn edit-btn" data-key="${key}" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-key="${key}" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            
            dataBody.appendChild(row);
            index++;
        }
        
        // Add event listeners to action buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const key = this.getAttribute('data-key');
                if (confirm('Are you sure you want to delete this student record?')) {
                    deleteStudent(key);
                }
            });
        });
        
        // Add styles for passed/failed
        const style = document.createElement('style');
        style.textContent = `
            .passed {
                color: #4caf50;
                font-weight: 600;
            }
            .failed {
                color: #dc3545;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Function to delete a student
    function deleteStudent(key) {
        if (sampleStudentData[key]) {
            delete sampleStudentData[key];
            saveStudentData();
            loadDataTable();
            showStatusMessage('Student record deleted successfully', 'success');
        }
    }
    
    // Save student data to localStorage
    function saveStudentData(downloadFile = false) {
        try {
            localStorage.setItem('btebStudentData', JSON.stringify(sampleStudentData));
            
            // Optionally export to a JSON file for download
            if (downloadFile) {
                const dataStr = JSON.stringify(sampleStudentData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'student_data.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showStatusMessage('All data exported successfully', 'success');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            showStatusMessage('Error saving data: ' + error.message, 'error');
        }
    }
    
    // Load student data from localStorage
    function loadStudentData() {
        try {
            const savedData = localStorage.getItem('btebStudentData');
            if (savedData) {
                sampleStudentData = JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            showStatusMessage('Error loading data: ' + error.message, 'error');
        }
    }
}); 
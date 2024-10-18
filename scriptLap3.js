const fileDetails = {
    'File1.pdf': { 
        updated: '01/10/2024', 
        owner: 'Nguyễn Văn A', 
        content: 'Nội dung của File1.pdf...', 
        related: {
            'Bài giảng 1.pdf': { updated: '01/10/2024', owner: 'Nguyễn Văn A', content: 'Nội dung của Bài giảng 1.pdf...' },
            'Bài tập tham khảo 1.docx': { updated: '01/10/2024', owner: 'Nguyễn Văn A', content: 'Nội dung của Bài tập tham khảo 1.docx...' }
        }
    },
    'File2.docx': { 
        updated: '05/10/2024', 
        owner: 'Trần Thị B', 
        content: 'Nội dung của File2.docx...', 
        related: {
            'Bài giảng 2.pdf': { updated: '05/10/2024', owner: 'Trần Thị B', content: 'Nội dung của Bài giảng 2.pdf...' },
            'Bài tập tham khảo 2.docx': { updated: '05/10/2024', owner: 'Trần Thị B', content: 'Nội dung của Bài tập tham khảo 2.docx...' }
        }
    },
    'File3.pptx': { 
        updated: '10/10/2024', 
        owner: 'Lê Văn C', 
        content: 'Nội dung của File3.pptx...', 
        related: {
            'Bài giảng 3.pdf': { updated: '10/10/2024', owner: 'Lê Văn C', content: 'Nội dung của Bài giảng 3.pdf...' },
            'Bài tập tham khảo 3.docx': { updated: '10/10/2024', owner: 'Lê Văn C', content: 'Nội dung của Bài tập tham khảo 3.docx...' }
        }
    },
};

const trashFiles = {}; // Cấu trúc dữ liệu để lưu các file đã xóa
let currentFileName = '';
const recentFiles = []; // Mảng lưu các file đã được sửa

function toggleFiles() {
    const myFilesMenu = document.getElementById('myFiles');
    myFilesMenu.classList.toggle('active');
}

function showFiles(type) {
    const fileContent = document.getElementById('fileContent');
    fileContent.innerHTML = `<h2>${type === 'yourfiles' ? 'Files' : 'Create File'}</h2>`;

    let files = type === 'yourfiles' 
        ? Object.keys(fileDetails) 
        : [];

    if (type === 'new') {
        fileContent.innerHTML += `<div class="create-file-button-container">
                                      <button class="create-file-button" onclick="openCreateFileModal()">New File</button>
                                   </div>`;
    }
    
    files.forEach(file => {
        fileContent.innerHTML += `
            <div class="file-item">
                <button class="file-button" onclick="showFileDetails('${file}')">${file}</button>
                <button class="delete-button" onclick="deleteFile('${file}')">
                    <img src="https://img.lovepik.com/png/20231018/Gray-cartoon-line-trash-bin-clipart-cartoon-lines-trash-can_250912_wh860.png" alt="Delete" class="trash-icon">
                </button>
            </div>`;
    });
}


function deleteFile(fileName) {
    if (confirm(`Are you sure you want to delete the file? "${fileName}"?`)) {
        trashFiles[fileName] = fileDetails[fileName]; // Chuyển file vào Trash
        delete fileDetails[fileName]; // Xóa file khỏi fileDetails
        alert(`File transferred "${fileName}" to Trash.`);
        showFiles('yourfiles'); // Cập nhật lại danh sách file
    }
}

function showTrashFiles() {
    const trashContent = document.getElementById('fileContent');
    trashContent.innerHTML = `<h2>Trash</h2>`;

    const filesInTrash = Object.keys(trashFiles);
    if (filesInTrash.length === 0) {
        trashContent.innerHTML += `<p>There are no files in Trash.</p>`;
        return;
    }

    filesInTrash.forEach(file => {
        trashContent.innerHTML += `
            <div class="file-item">
                <span>${file}</span>
                <button class="restore-button" onclick="restoreFile('${file}')">
                    <img src="https://png.pngtree.com/png-vector/20190530/ourlarge/pngtree-wastedisposalgarbagemanagementrecycle-flat-icon--green-a-png-image_1158972.jpg" alt="Restore" class="restore-icon">
                </button>
            </div>`;
    });
}

function restoreFile(fileName) {
    fileDetails[fileName] = trashFiles[fileName]; // Khôi phục file từ Trash
    delete trashFiles[fileName]; // Xóa file khỏi Trash
    alert(`File restored: ${fileName}`);
    showTrashFiles(); // Cập nhật danh sách Trash
}

function showRecentFiles() {
    const fileContent = document.getElementById('fileContent');
    fileContent.innerHTML = `<h2>Recent Files</h2>`;
    
    if (recentFiles.length === 0) {
        fileContent.innerHTML += `<p>No files have been modified recently.</p>`;
    } else {
        recentFiles.forEach(file => {
            fileContent.innerHTML += `<button class="file-button" onclick="showFileDetails('${file}')">${file}</button>`;
        });
    }
}

function showFileDetails(fileName, isTrash = false) {
    currentFileName = fileName;
    const details = isTrash ? trashFiles[fileName] : fileDetails[fileName];

    document.getElementById('fileName').innerText = fileName;
    document.getElementById('lastUpdated').innerText = details.updated;
    document.getElementById('owner').innerText = details.owner;

    // Display related files if not in trash
    if (!isTrash) {
        const relatedFileList = document.getElementById('relatedFileList');
        relatedFileList.innerHTML = '';
        for (const relatedFile in details.related) {
            relatedFileList.innerHTML += `<li><button class="related-file-button" onclick="showRelatedFileDetails('${fileName}', '${relatedFile}')">${relatedFile}</button></li>`;
        }
    }

    // Update content display
    document.getElementById('editableContent').style.display = 'none';
    document.getElementById('nonEditableContent').style.display = 'block';
    document.getElementById('nonEditableContent').innerText = details.content;

    const modal = document.getElementById('fileDetails');
    modal.style.display = 'block';
}

function showRelatedFileDetails(parentFileName, relatedFileName) {
    const relatedDetails = fileDetails[parentFileName].related[relatedFileName];
    document.getElementById('fileName').innerText = relatedFileName;
    document.getElementById('lastUpdated').innerText = relatedDetails.updated;
    document.getElementById('owner').innerText = relatedDetails.owner;

    // Display content
    document.getElementById('editableContent').style.display = 'none';
    document.getElementById('nonEditableContent').style.display = 'block';
    document.getElementById('nonEditableContent').innerText = relatedDetails.content;

    const modal = document.getElementById('fileDetails');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('fileDetails');
    modal.style.display = 'none';
}

function editContent() {
    const details = fileDetails[currentFileName];
    document.getElementById('editableContent').style.display = 'block';
    document.getElementById('nonEditableContent').style.display = 'none';
    document.getElementById('editableContent').value = details.content; 
    document.getElementById('saveButton').style.display = 'inline'; 
}

function saveContent() {
    const newContent = document.getElementById('editableContent').value;
    fileDetails[currentFileName].content = newContent; 

    // Update the last updated time
    const updatedTime = formatDate(new Date());
    fileDetails[currentFileName].updated = updatedTime; 
    document.getElementById('lastUpdated').innerText = updatedTime; 

    // Update displayed content
    document.getElementById('nonEditableContent').innerText = newContent; 
    document.getElementById('editableContent').style.display = 'none';
    document.getElementById('saveButton').style.display = 'none'; 

    // Add file to recentFiles
    if (!recentFiles.includes(currentFileName)) {
        recentFiles.push(currentFileName);
    }

    closeModal();
    showFileDetails(currentFileName);
}

function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

function openCreateFileModal() {
    const modal = document.getElementById('createFileModal');
    modal.style.display = 'block';
}

function closeCreateFileModal() {
    const modal = document.getElementById('createFileModal');
    modal.style.display = 'none';
}

function createNewFile() {
    const fileName = document.getElementById('newFileName').value;
    const fileContent = document.getElementById('newFileContent').value;

    if (fileName && fileContent) {
        // Check if file already exists
        if (fileDetails[fileName] || trashFiles[fileName]) {
            alert('File with this name already exists. Please choose a different name.');
            return;
        }

        fileDetails[fileName] = {
            updated: formatDate(new Date()),
            owner: 'New User',
            content: fileContent,
            related: {}
        };
        alert(`File created successfully: ${fileName}`);

        closeCreateFileModal();
        showFiles('yourfiles'); // Update file list
    } else {
        alert('Please enter file name and content.');
    }
}

let sharedFiles = {};

function showShareWithMe() {
    const fileContent = document.getElementById('fileContent');
    fileContent.innerHTML = `<h2>Share with Me</h2>
                             <div id="shareWithMeContainer" style="border: 2px dashed #ccc; padding: 20px; text-align: center;" ondrop="drop(event)" ondragover="allowDrop(event)">
                                 <h3>Drag and drop files here</h3>
                             </div>`;
}

function allowDrop(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
}

function drop(event) {
    event.preventDefault();
    const fileName = event.dataTransfer.getData("text");
    if (fileName) {
        // Kiểm tra xem file đã được chia sẻ chưa
        if (!sharedFiles[fileName]) {
            sharedFiles[fileName] = fileDetails[fileName]; // Chia sẻ file
            alert(`File ${fileName} has been shared with you!`);
        } else {
            alert(`File ${fileName} already exists in the share list.`);
        }
    }
    showFiles('yourfiles'); // Cập nhật danh sách file
}

function filterFiles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const files = Object.keys(fileDetails);
    const fileContent = document.getElementById('fileContent');
    
    fileContent.innerHTML = '<h2>Documents Being Shared</h2>'; // Reset lại tiêu đề

    const filteredFiles = files.filter(file => file.toLowerCase().includes(searchInput));

    if (filteredFiles.length === 0) {
        fileContent.innerHTML += '<p>No files found.</p>';
    } else {
        filteredFiles.forEach(file => {
            fileContent.innerHTML += `
                <div class="file-item">
                    <button class="file-button" onclick="showFileDetails('${file}')">${file}</button>
                    <button class="delete-button" onclick="deleteFile('${file}')">
                        <img src="https://img.lovepik.com/png/20231018/Gray-cartoon-line-trash-bin-clipart-cartoon-lines-trash-can_250912_wh860.png" alt="Delete" class="trash-icon">
                    </button>
                </div>`;
        });
    }
}

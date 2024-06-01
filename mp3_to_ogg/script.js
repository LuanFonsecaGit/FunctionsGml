document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select an MP3 file.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://api.cloudconvert.com/v2/convert', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.result) {
            const downloadUrl = data.data.result.url;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.textContent = 'Download converted OGG file';
            link.download = 'converted.ogg';
            document.getElementById('downloadLink').appendChild(link);
        } else {
            console.error('Conversion failed:', data);
            alert('Conversion failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during conversion.');
    });
});

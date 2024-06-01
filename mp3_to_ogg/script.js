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
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTBjZjYzMmY2NTFmN2IwYjBiYjI0N2JiZGM1MTAxZDhjMWJlZTU1ZDBmOTg3ZGExODI0NTkxMjNmZmM2ODgyMGM3NDNhNmIxMTFjZmEzNjIiLCJpYXQiOjE3MTcyNzA5ODUuNTA1MjY2LCJuYmYiOjE3MTcyNzA5ODUuNTA1MjY5LCJleHAiOjQ4NzI5NDQ1ODUuNDk5NjYsInN1YiI6IjY4NTczNTM2Iiwic2NvcGVzIjpbXX0.HVXdHKkyshKqVj2vM93sEYJ2cu5C0_s3Sw8Q0jbdr9UZ5cY4bzDUCiFDLnZUf4YRIxbjeCe_RlqG9duU8CwZIUrWZ2y_4yV77lWGYG_eVqEMQeiMIFRlwetdR6FugzivBQU8btBPtSjCyJWQo88d7jxTfQChscuTSjPdr9IJ124Ok8U6YP4uvJliYU4KPJyNp-R3sPjC8fbFn_8lMzanUd1uSSI-k-o8r5oWhZ4ieUsbCa_Kg5wgam2jBc721WdfeXnUB4r-D0wAtFUTVthytRUKLIP4jK9SgqOcAWRng9ZcvDTRdRhKbHjKKHpw2r52A9WFcgdizObGXIhu0XSHUo_1f74mlc7c1zzy6LJ-tEEhGj2HhfNTVJdm1jrsWaWBgB5bqkHz8s9q0c8iv_Doolrt-NkzJvAXJXmJIGPeHOiDePf-NLaP_Ymjl5ZInYfuV5WJKuBVm5BczEpaQim_vYDSY97_F7MZC7zFLJ3JfwIYRgpZzok5wOlnwLBFyYoMDfh8M1J9z6aIZpcGkK2Ovc4ZpBLv207cLvuDG5FeDCPQ_bPjV-JfD_bRlwWSIP06fg-GjBi5M2PBLcR-eulgUYBcCdEymdA7LThyQqcEuPptucU4XufisPp1P7_2PtdNcF-iM0rLD7HkC0XmNYW1RCnUE-DjaYinLMfg2dbCswA'
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

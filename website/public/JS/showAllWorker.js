document.addEventListener("DOMContentLoaded", function () {
    // callback for showing All Users
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const workerList = document.getElementById("workerList");
        // Create a row to hold the worker cards
        let currentRow;

        // loop through each user and create a new div
        responseData.forEach((worker, index) => {
            // Start a new row for every 3 workers
            if (index % 3 === 0) {
                currentRow = document.createElement("div");
                currentRow.className = "row mb-4";
                workerList.appendChild(currentRow);
            }

            const displayItem = document.createElement("div");
            displayItem.className = "col-md-4"; // This makes it 3 columns on medium and larger screens
            displayItem.innerHTML = `
                <div class="card bg-transparent border-0">
                    <div class="card-body">
                        <h5 class="card-title">${worker.username}</h5>
                        <img id="profileImage-${worker.username}" class="w-100 img-thumbnail" src="/Images/profile.jpg" alt="profile-pic">
                    </div>
                    <p>
                        <button id="alertButton-${worker.username}" class="btn btn-danger btn-lg" type="button" onclick="toggleAlert('${worker.username}')">
                            Alert
                        </button>
                    </p>
                </div>
            `;
            currentRow.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/worker/", callback, "GET");




    const createWorker = document.getElementById("createWorker");

    // EventListener for adding new Task
    createWorker.addEventListener("click", function (event) {
        event.preventDefault();

        // Values of the Form
        const username = document.getElementById("username").value;

        const data = {
            username: username,
        };
        console.log(data);
        const createTaskCB = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 201) {
                window.location.reload();
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

        // Perform POST request
        fetchMethod(currentUrl + "/api/worker/", createTaskCB, "POST", data);
    });
});



function toggleAlert(username) {
    console.log("Toggle Alert called for username:", username);

    const img = document.getElementById(`profileImage-${username}`);
    const btn = document.getElementById(`alertButton-${username}`);

    if (!img) {
        console.error(`Image element not found for username: ${username}`);
        return;
    }

    if (!btn) {
        console.error(`Button element not found for username: ${username}`);
        return;
    }

    console.log("Current image src:", img.src);

    if (img.src.endsWith('profile.jpg')) {
        img.src = '/Images/profile_alert.jpg';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-warning');
        btn.textContent = 'Cancel Alert';
    } else {
        img.src = '/Images/profile.jpg';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-danger');
        btn.textContent = 'Alert';
    }

    console.log("Image src after toggle:", img.src);
}

// Ensure the DOM is fully loaded before allowing the function to be called
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");
});
document.addEventListener("DOMContentLoaded", function () {
    // Getting Info from params and localStorage
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const userId = urlParams.get("user_id");
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");

    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userInfo = document.getElementById("userInfo");
        if (responseStatus == 404) {
            // Handling Errors
            userInfo.innerHTML = `You are not Signed In!`;
            return;
        } else if (responseData.error !== undefined) {
            userInfo.innerHTML = `
                <div class="card text-center bg-transparent border-0">
                    <div class="card-body">
                        <p class="card-text">
                            ${responseData.error}
                        </p>
                    </div>
                </div>
              `;
        } else if (getUserId != userId) {
            // Handling Errors
            userInfo.innerHTML = `
                <div class="card text-center bg-transparent border-0">
                    <div class="card-body">
                        <p class="card-text">
                            You do not have the rights to view another user information!
                        </p>
                    </div>
                </div>
              `;
        } else {
            userInfo.innerHTML = `
              <div class="card bg-transparent border-0">
                  <div class="card-body">
                      <p class="card-text">
                          User ID: ${responseData.user_id} <br>
                          Userame: ${responseData.username} <br>
                          Email: ${responseData.email} <br>
                          Total Points: ${responseData.total_points} <br>
                      </p>
                  </div>
              </div>
            `;
        }
    };

    fetchMethod(
        currentUrl + `/api/users/${getUserId}`,
        callbackForUserInfo,
        "GET",
        null,
        (token = getToken)
    );
});
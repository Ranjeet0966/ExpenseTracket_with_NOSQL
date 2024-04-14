// const form = document.getElementById("form");
// const submitbtn = document.getElementById("submit");
// const email = document.getElementById("email");
// const URL='http://localhost:4000'


// form.addEventListener("submit", async function (e) {
//   if (!form.checkValidity()) {
//     e.preventDefault();
//   } else {
//     e.preventDefault();

//     let obj = {
//       email: email.value,
//     };

//     try {
//       const res=await axios.post(
//         "http://localhost:4000/password/forgotpassword",
//         obj
//       );
//     } catch (error) {
//       if (error.response.status === 404 || error.response.status === 401) {
//         document.body.innerHTML += `<div style='color:red;'>${error.response.data.message}</div>`;
//       } else {
//         document.body.innerHTML += `<div style='color:red;'>${error}</div>`;
//       }
//     }

//     email.value = "";
//   }
//   form.classList.add("was-validated");
// });

const form = document.getElementById("form");
const email = document.getElementById("email");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  form.classList.add("was-validated");

  if (form.checkValidity()) {
    try {
      const obj = {
        email: email.value,
      };
console.log(obj)

       const res=await axios.post(
        "http://localhost:4000/password/forgotpassword",
        obj
      );

      // Handle successful response (if needed)
      console.log(res.data); // Log the response data or perform other actions
    } catch (error) {
      // Handle errors
      console.log(error);
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 401) {
          showError(error.response.data.message);
        } else {
          showError(`Server Error: ${error.response.status}`);
        }
      } else {
        showError(`Network Error: ${error.message}`);
      }
    }

    email.value = "";
  }
});

function showError(message) {
  // Display error message in the document body
  const errorDiv = document.createElement("div");
  errorDiv.style.color = "red";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
}


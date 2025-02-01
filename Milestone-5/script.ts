document
  .getElementById("resume-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();


    const profilePicInput = document.getElementById(
      "profilePic"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const contactElement = document.getElementById(
      "contact"
    ) as HTMLInputElement;
    const addressElement = document.getElementById(
      "address"
    ) as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLInputElement;
    const uniqueNameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;



    if (
      profilePicInput &&
      nameElement &&
      emailElement &&
      contactElement &&
      addressElement &&
      educationElement &&
      skillsElement &&
      experienceElement
      
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const contact = contactElement.value;
      const address = addressElement.value;
      const education = educationElement.value;
      const skills = skillsElement.value;
      const experience = experienceElement.value;

   
      const profilePicFile = profilePicInput.files?.[0];
      const profilePicURL = profilePicFile
        ? URL.createObjectURL(profilePicFile)
        : "";

      //generate resume
      const resumeHTML = `
    <center><h2><b>Resume</b></h2></center>
    ${
      profilePicURL
        ? `<img src="${profilePicURL}" alt = "Profile Picture" class="profilePic">`
        : ""
    }
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span id ="edit-name" class="editable"> ${name} </span> </p>
    <p><b>Email:</b> <span id ="edit-email" class="editable"> ${email} </span> </p>
    <p><b>Contact:</b> <span id ="edit-contact" class="editable"> ${contact} </span> </p>
    <p><b>Address:</b> <span id ="edit-address" class="editable"> ${address} </span> </p>

    <h3>Education</h3>
    <p id ="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id ="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id ="edit-skills" class="editable">${skills}</p>
    `;



      



      const resumeHTMLElement = document.getElementById("resume-display");
      if (resumeHTMLElement) {
        resumeHTMLElement.innerHTML = resumeHTML; 
      
        resumeHTMLElement.classList.remove("hidden");

        const buttons = document.createElement("div");
        buttons.id = "buttons";
        resumeHTMLElement.appendChild(buttons);

        const downloadButton =document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click",  () =>{
          window.print();
        })
        buttons.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () =>{
          try{

            const shareableLink = `https://yourdomain.com/resumes/${name.replace(
              /\s+/g, "_"
            )}_cv.html`;

            await navigator.clipboard.writeText(shareableLink);

          } 
          catch(err){
            console.error("Failed to copy link: " , err);
            alert("Failed to copy link to clioboard. Please try again!");
          }
        });
       
         buttons.appendChild(shareLinkButton)

      }
    } else {
      console.error("One or more elements are missing");
    }
  });

  //Making editable

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";
      makeEditable();
      
      if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}
